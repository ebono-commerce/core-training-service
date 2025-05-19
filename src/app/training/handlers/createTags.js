const createTagService = require("../services/createTags");

function createTagHandler(fastify) {
  const createTag = createTagService(fastify);
  return async (request, reply) => {
    const { body, logTrace } = request;
    const response = await createTag({ body, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = createTagHandler;
