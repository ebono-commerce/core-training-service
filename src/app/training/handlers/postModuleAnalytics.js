const postModuleAnalyticsService = require("../services/postModuleAnalytics");

function postModuleAnalyticsHandler(fastify) {
  const postModuleAnalytics = postModuleAnalyticsService(fastify);
  return async (request, reply) => {
    const { params, logTrace, body } = request;
    const response = await postModuleAnalytics({ params, logTrace, body });
    return reply.code(200).send(response);
  };
}

module.exports = postModuleAnalyticsHandler;
