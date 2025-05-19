const createCourseService = require("../services/createCourse");

function createCourseHandler(fastify) {
  const createCourse = createCourseService(fastify);
  return async (request, reply) => {
    const { body, logTrace } = request;
    const response = await createCourse({ body, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = createCourseHandler;
