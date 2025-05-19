const updateModuleCourseService = require("../services/postModuleCourse");

function postCourseModuleHandler(fastify) {
  const updateModuleCourse = updateModuleCourseService(fastify);
  return async (request, reply) => {
    const { body, params, logTrace } = request;
    const response = await updateModuleCourse({ body, params, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = postCourseModuleHandler;
