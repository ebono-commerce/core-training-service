exports.up = knex => {
  return knex
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => knex.schema.hasTable("tag"))
    .then(exists => {
      if (!exists) {
        return knex.schema.createTable("tag", table => {
          table.string("tag_id").primary().defaultTo("errror");
          table.string("tag").unique();
        });
      }
      return false;
    });
};

exports.down = knex => {
  return knex.schema.dropTable("tag");
};
