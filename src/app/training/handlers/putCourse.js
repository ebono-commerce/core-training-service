const putCourseService = require("../services/putCourse");

function putCourseHandler(fastify) {
  const putCourse = putCourseService(fastify);
  return async (request, reply) => {
    const { body, params, logTrace } = request;
    const response = await putCourse({ body, logTrace, params });
    return reply.code(201).send(response);
  };
}

module.exports = putCourseHandler;
