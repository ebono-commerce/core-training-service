exports.up = knex => {
  return knex.schema.hasTable("course").then(exists => {
    if (exists) {
      return knex.schema.table("course", table => {
        table.text("description").alter();
      });
    }
    return false;
  });
};

exports.down = knex => {
  return knex.schema.hasTable("course").then(exists => {
    if (exists) {
      return knex.schema.table("course", table => {
        table.string("description").alter();
      });
    }
    return false;
  });
};
