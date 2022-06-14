exports.up = function (knex) {
  return knex.schema.createTable("characters", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.string("description").notNull();
    table.string("picture_url").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("characters");
};
