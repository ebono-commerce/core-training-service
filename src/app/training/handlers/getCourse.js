const getCourseService = require("../services/getCourse");

function getCourseHandler(fastify) {
  const getCourse = getCourseService(fastify);
  return async (request, reply) => {
    const { body, query, params, logTrace } = request;
    const response = await getCourse({ body, query, params, logTrace });
    return reply.code(200).send(response);
  };
}

module.exports = getCourseHandler;
