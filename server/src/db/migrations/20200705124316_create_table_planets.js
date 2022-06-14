exports.up = function (knex) {
  return knex.schema.createTable("planets", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.string("description").notNull();
    // TODO: SQL validation on type XX-XXX-00
    table.string("code").notNull().unique();
    table.string("picture_url").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("planets");
};
