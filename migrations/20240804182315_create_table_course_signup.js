exports.up = knex => {
  return knex.schema.hasTable("course_signup").then(exists => {
    if (!exists) {
      return knex.schema.createTable("course_signup", table => {
        table.string("course_id").notNullable();
        table.string("user_id").notNullable();
        table.string("created_user_id");
        table.datetime("created_at");
        table.primary(["course_id", "user_id"]);
      });
    }
    return false;
  });
};

exports.down = knex => {
  return knex.schema.dropTable("course_signup");
};
