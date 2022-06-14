const { ApolloServer } = require("apollo-server");
const graphql = require("./src/graphql");
const planetsService = require("./src/services/PlanetsService");
const charactersService = require("./src/services/CharactersService");

const server = new ApolloServer({
  ...graphql,
  context: () => ({ planetsService, charactersService }),
});

server.listen().then(({ url }) => console.log(url));
