const { logQuery } = require("../../commons/helpers");

function courseModuleMapRepo(fastify) {
  async function mapCourseModule({ data, logTrace }) {
    const knex = this;

    const query = knex("course_module_mapping").insert(data);

    logQuery({
      logger: fastify.log,
      query,
      context: "Course Module map",
      logTrace
    });

    const response = await query;
    return response;
  }

  return {
    mapCourseModule
  };
}

module.exports = courseModuleMapRepo;
