exports.up = knex => {
  return knex.schema.hasTable("course_attendance").then(exists => {
    if (!exists) {
      return knex.schema.createTable("course_attendance", table => {
        table.string("course_id").notNullable();
        table.string("user_id").notNullable();
        table.datetime("started_at");
        table.primary(["course_id", "user_id"]);
      });
    }
    return false;
  });
};

exports.down = knex => {
  return knex.schema.dropTable("course_attendance");
};
