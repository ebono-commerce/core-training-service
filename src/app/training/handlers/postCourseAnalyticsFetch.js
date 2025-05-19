const postCourseAnalyticsFetchService = require("../services/postCourseAnalyticsFetch");

function postCourseAnalyticsFetchHandler(fastify) {
  const postCourseAnalyticsFetch = postCourseAnalyticsFetchService(fastify);
  return async (request, reply) => {
    const { body, logTrace } = request;
    const response = await postCourseAnalyticsFetch({ body, logTrace });
    return reply.code(200).send(response);
  };
}

module.exports = postCourseAnalyticsFetchHandler;
