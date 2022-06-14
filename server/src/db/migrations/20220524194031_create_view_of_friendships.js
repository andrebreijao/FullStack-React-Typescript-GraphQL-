exports.up = function (knex) {
    const query = `
    CREATE VIEW friendship_view AS
    SELECT person1 AS person, person2 AS friend FROM friendship
    UNION
    SELECT person2 AS person, person1 AS friend FROM friendship;
    `;
    return knex.schema.raw(query);
  };
  
  exports.down = function (knex) {
    const query = `
    drop view friendship_view 
    `;
    return knex.schema.raw(query);
  };
  