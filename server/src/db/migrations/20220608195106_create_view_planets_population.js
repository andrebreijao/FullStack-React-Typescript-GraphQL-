exports.up = function (knex) {
  const query = `
    CREATE VIEW planets_population as
    select p.code, count(c.id) from "characters" c 
        right join planets p on c.planet=p.code 
            group by p.code
    `;
  return knex.schema.raw(query);
};

exports.down = function (knex) {
  const query = `
    drop view planets_population
    `;
  return knex.schema.raw(query);
};
