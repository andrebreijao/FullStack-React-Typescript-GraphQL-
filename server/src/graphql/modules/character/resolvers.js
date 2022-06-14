module.exports = {
  Query: {
    characters: async (obj, args, context, info) =>
      await context.charactersService.characters(),
    character: async (obj, { id }, context, info) =>
      await context.charactersService.characterById(id),
  },

  Character: {
    planet: async (obj, args, context, info) => {
      const { planet: planetCode } = obj;

      return await context.planetsService.planetByCode(planetCode);
    },
    friendsCount: async (obj, args, context, info) => {
      const { id } = obj;
      const friendshipNumber = await context.charactersService.countFriendships(
        id
      );
      return friendshipNumber;
    },
    friends: async (obj, args, context, info) => {
      const { id } = obj;
      const { limit } = args;
      const friendships = await context.charactersService.getFriends(id, limit);
      return friendships;
    },
  },

  Mutation: {
    createCharacter: async (_, { data }, { charactersService }) =>
      await charactersService.createCharacter(data),
    updateCharacter: async (_, { id, data }, { charactersService }) =>
      await charactersService.updateCharacter(id, data),
    deleteCharacter: async (_, { filter }, { charactersService }) =>
      await charactersService.deleteCharacter(filter),
    createFriendship: async (_, { data }, { charactersService }) =>
      await charactersService.createFriendship(data),
    deleteFriendship: async (_, { data }, { charactersService }) =>
      await charactersService.deleteFriendship(data),
  },
};
