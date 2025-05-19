exports.up = knex => {
  return knex.schema.hasTable("course").then(exists => {
    if (!exists) {
      return knex.schema.createTable("course", table => {
        table.string("course_id").primary().defaultTo("Error");
        table.string("course_name");
        table.string("description");
        table.string("course_category");
        table.string("audience");
        table.string("complexity_level");
        table.jsonb("audit");
        table.jsonb("modules");
        table.jsonb("evaluations");
      });
    }
    return false;
  });
};

exports.down = knex => {
  return knex.schema.dropTable("course");
};
