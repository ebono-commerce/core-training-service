exports.up = knex => {
  return knex.schema.hasTable("user_module_analytics").then(exists => {
    if (!exists) {
      return knex.schema.createTable("user_module_analytics", table => {
        table.string("course_id").notNullable();
        table.string("module_number").notNullable();
        table.string("user_id").notNullable();
        table.string("status").notNullable();
        table.primary(["course_id", "user_id", "module_number"]);
      });
    }
    return false;
  });
};

exports.down = knex => {
  return knex.schema.dropTable("course_user_evaluation");
};
