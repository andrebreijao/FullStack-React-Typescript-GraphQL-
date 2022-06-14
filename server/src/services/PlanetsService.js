const db = require("../db");

class PlanetsService {
  constructor(service) {
    this.service = service;
  }

  planets = async (offset, pageSize) =>
    await this.service("planets")
      .offset(offset)
      .limit(pageSize)
      .orderBy("id", "desc");

  planetById = async (id) => await this.service("planets").where({ id });

  planetByCode = async (code) =>
    await (
      await this.service("planets").where({ code })
    )[0];

  planetPopulationByCode = async (code) => {
    const { count } = await (
      await this.service("planets_population").where({ code })
    )[0];
    return count;
  };

  createPlanet = async (data) => {
    // Verify if the planet code is already exists
    const planet = await this.planetByCode(data.code);
    if (planet) {
      throw new Error(
        "Planet code already being used, please insert another code!"
      );
    }

    //TODO: Verify if the planet code format is XX-XXX-12

    try {
      return await (
        await this.service("planets").insert(data).returning("*")
      )[0];
    } catch (e) {
      throw new Error(e);
    }
  };

  updatePlanet = async (id, data) => {
    try {
      await (
        await this.service("planets").where({ id }).update(data).returning("*")
      )[0];
    } catch (e) {
      throw new Error(e);
    }
  };

  deletePlanet = async (filter) => {
    const { id, code } = filter;
    if (id) {
      return await this.service("planets").where({ id }).delete(0);
    }
    if (code) {
      return await this.service("planets").where({ code }).delete(0);
    }

    throw new Error("Please, send a valid paramer!");
  };
}

module.exports = new PlanetsService(db);
