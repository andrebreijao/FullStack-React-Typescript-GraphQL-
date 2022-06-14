exports.up = function (knex) {
    const query = `
    CREATE TABLE friendship (
        person1 INT NOT null references public.characters ("id"),
        person2 INT NOT null references public.characters ("id"),
        PRIMARY KEY (person1, person2),
        CHECK (person1 < person2)
       );
       CREATE INDEX friendship_person2 ON friendship(person2);
    `;
    return knex.schema.raw(query);
  };
  
  exports.down = function (knex) {
    const query = `
    drop table friendship 
    `;
    return knex.schema.raw(query);
  };
  