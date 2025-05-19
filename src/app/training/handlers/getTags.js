const getTagsService = require("../services/getTags");

function getTagsHandler(fastify) {
  const getTags = getTagsService(fastify);
  return async (request, reply) => {
    const { logTrace } = request;
    const response = await getTags({ logTrace });
    return reply.code(200).send(response);
  };
}

module.exports = getTagsHandler;
