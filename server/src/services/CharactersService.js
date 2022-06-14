const db = require("../db");
const PlanetsService = require("./PlanetsService");

class CharactersService {
  constructor(service) {
    this.service = service;
  }

  characters = async () =>
    await this.service("characters").orderBy("id", "desc");

  characterById = async (id) =>
    await (
      await this.service("characters").where({ id })
    )[0];

  charactersByPlanetCode = async (code, limit) => {
    if (limit) {
      return await this.service("characters")
        .where({ planet: code })
        .limit(limit);
    }
    return await this.service("characters").where({ planet: code });
  };

  createCharacter = async (data) => {
    const { listOfFriends } = data;

    //Validade if the planet code provided is valid
    const planet = await PlanetsService.planetByCode(data.planet);

    if (!planet) {
      throw new Error(
        "Planet is not from this universe. Please, insert a valid planet code!"
      );
    }

    try {
      delete data.listOfFriends;
      const newCharacter = await (
        await this.service("characters").insert(data).returning("*")
      )[0];

      // Create friendships
      for (let friendId of listOfFriends) {
        await this.createFriendship({
          person1Id: newCharacter.id,
          person2Id: friendId,
        });
      }

      return newCharacter;
    } catch (e) {
      throw new Error(e);
    }
  };

  updateCharacter = async (id, data) =>
    await (
      await this.service("characters").where({ id }).update(data).returning("*")
    )[0];

  deleteCharacter = async (filter) => {
    const { id } = filter;
    if (id) {
      return await this.service("characters").where({ id }).delete(0);
    }

    throw new Error("Please, send a valid paramet!");
  };

  getFriendship = async (data) => {
    const { person1Id, person2Id } = data;

    return await (
      await this.service("friendship_view").where({
        person: person1Id,
        friend: person2Id,
      })
    )[0];
  };

  createFriendship = async (data) => {
    const { person1Id, person2Id } = data;

    // Validate if two ids are provided
    if (!person1Id || !person2Id) {
      throw new Error("Please, two valid ids must be provided!");
    }

    // Verify if the ids are valid
    const person1 = await this.characterById(person1Id);
    const person2 = await this.characterById(person2Id);

    if (!person1 || !person2) {
      throw new Error("It seems that one or both of the ids are not valid!");
    }

    if (person1Id < person2Id) {
      const response = await this.service("friendship").insert({
        person1: person1Id,
        person2: person2Id,
      });

      return !!response;
    }

    //Verify if friendship alreay exists
    const friendship = await this.getFriendship({ person1Id, person2Id });
    if (friendship) {
      throw new Error("Friendship already exists!");
    }

    const response = await this.service("friendship").insert({
      person1: person2Id,
      person2: person1Id,
    });

    return !!response;
  };

  deleteFriendship = async (data) => {
    const { person1Id, person2Id } = data;
    if (!person1Id || !person2Id) {
      throw new Error("Please, insert valid ids!");
    }

    const response = await Promise.all([
      this.service("friendship")
        .select("*")
        .where({ person1: person1Id, person2: person2Id })
        .del(),
      this.service("friendship")
        .select("*")
        .where({ person1: person2Id, person2: person1Id })
        .del(),
    ]);
    return !!response[0] || !!response[1];
  };

  countFriendships = async (id) => {
    const response = await this.service("friendship_count")
      .select("*")
      .where({ id });
    return response.length > 0 && response[0]?.count ? response[0].count : 0;
  };

  getFriends = async (id, limit) => {
    const frienshipListIds = await this.service("friendship_view")
      .select("*")
      .where({ person: id })
      .limit(limit);

    const friendshipList = [];

    for (let person of frienshipListIds) {
      const friend = await this.characterById(person.friend);
      friendshipList.push(friend);
    }
    return friendshipList;
  };
}

module.exports = new CharactersService(db);
