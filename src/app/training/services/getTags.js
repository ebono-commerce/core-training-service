const tagRepo = require("../repository/tags");

function getTagsService(fastify) {
  const { getTags } = tagRepo(fastify);

  return async ({ logTrace }) => {
    const { knex } = fastify;
    const response = await getTags.call(knex, {
      logTrace
    });
    return response; // User transformer in case transformation is needed
  };
}

module.exports = getTagsService;
