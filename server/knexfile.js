// Update with your config settings.

module.exports = {
  client: "pg",
  connection: {
    database: "postgres",
    user: "postgres",
    // TODO: send this environment variable
    password: "docker",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/db/migrations",
  },
};
