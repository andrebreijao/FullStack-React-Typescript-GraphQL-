exports.up = function (knex) {
  const query = `ALTER TABLE public."characters" ADD COLUMN planet varchar(255) references public.planets ("code")`;
  return knex.schema.raw(query);
};

exports.down = function (knex) {
  const query = `ALTER TABLE public."characters" DROP COLUMN planet`;
  return knex.schema.raw(query);
};
