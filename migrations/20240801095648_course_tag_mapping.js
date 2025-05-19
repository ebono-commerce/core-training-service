exports.up = knex => {
  return knex.schema.hasTable("course_tag_mapping").then(exists => {
    if (!exists) {
      return knex.schema.createTable("course_tag_mapping", table => {
        table.string("course_id").notNullable();
        table.string("tag_id").notNullable();
        table.primary(["course_id", "tag_id"]);
        table.foreign("course_id").references("course_id").inTable("course");
        table.foreign("tag_id").references("tag_id").inTable("tag");
      });
    }
    return false;
  });
};

exports.down = knex => {
  return knex.schema.dropTable("course_tag_mapping");
};
