const courseRepo = require("../repository/courses");

function postModuleCourseService(fastify) {
  const { updateModule } = courseRepo(fastify);

  return async ({ body, logTrace, params }) => {
    const { course_id } = params;

    const response = await updateModule.call(fastify.knex, {
      data: JSON.stringify(body),
      course_id,
      logTrace
    });

    return response;
  };
}

module.exports = postModuleCourseService;
