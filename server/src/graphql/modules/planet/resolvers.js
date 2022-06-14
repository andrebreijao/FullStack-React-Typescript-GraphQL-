module.exports = {
  Query: {
    planets: async (obj, args, context, info) => {
      let { pageSize, page } = args;
      pageSize = pageSize && pageSize > 0 ? pageSize : 10;
      page = page && page > 0 ? page : 1;

      const offset = (page - 1) * pageSize;

      return await context.planetsService.planets(offset, pageSize);
    },
    planet: async (obj, { id }, context, info) =>
      await (
        await context.planetsService.planetById(id)
      )[0],
  },
  Planet: {
    population: async (obj, { id }, context, info) => {
      const { code } = obj;
      return await context.planetsService.planetPopulationByCode(code);
    },
    characters: async (obj, args, context, info) => {
      const { code } = obj;
      const { limit } = args;

      const characters = await context.charactersService.charactersByPlanetCode(
        code,
        limit
      );
      return characters;
    },
  },

  Mutation: {
    createPlanet: async (_, { data }, { planetsService }) =>
      await planetsService.createPlanet(data),
    updatePlanet: async (_, { id, data }, { planetsService }) =>
      await planetsService.updatePlanet(id, data),
    deletePlanet: async (_, { filter }, { planetsService }) => {
      await planetsService.deletePlanet(filter);
    },
  },
};
