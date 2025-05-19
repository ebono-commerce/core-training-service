const getUserCourseAnalyticsService = require("../services/getUserCourseAnalytics");

function getUserCourseAnalytics(fastify) {
  const getUserCourseAnalytics = getUserCourseAnalyticsService(fastify);
  return async (request, reply) => {
    const { query, logTrace } = request;
    const response = await getUserCourseAnalytics({ query, logTrace });
    return reply.code(200).send(response);
  };
}

module.exports = getUserCourseAnalytics;
