exports.up = function (knex) {
    const query = `
    CREATE VIEW friendship_count as
    select person as id, count(person) from friendship_view fv group by person 
    `;
    return knex.schema.raw(query);
  };
  
  exports.down = function (knex) {
    const query = `
    drop view friendship_count
    `;
    return knex.schema.raw(query);
  };
  