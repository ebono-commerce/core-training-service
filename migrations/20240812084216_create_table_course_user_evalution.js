exports.up = knex => {
  return knex.schema.hasTable("course_user_evaluation").then(exists => {
    if (!exists) {
      return knex.schema.createTable("course_user_evaluation", table => {
        table.string("course_id").notNullable();
        table.string("user_id").notNullable();
        table.datetime("completed_at");
        table.primary(["course_id", "user_id"]);
        table.jsonb("evaluations");
        table.integer("evaluation_score");
        table.integer("total_questions");
      });
    }
    return false;
  });
};

exports.down = knex => {
  return knex.schema.dropTable("course_user_evaluation");
};
