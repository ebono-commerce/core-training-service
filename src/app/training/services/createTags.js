const ShortUniqueId = require("short-unique-id");

const { randomUUID } = new ShortUniqueId({ length: 10 });
const tagRepo = require("../repository/tags");

function createTagsService(fastify) {
  const { createTag } = tagRepo(fastify);

  return async ({ body, logTrace }) => {
    const { tag } = body;
    const { knex } = fastify;
    const response = await createTag.call(knex, {
      data: { tag_id: randomUUID(), tag },
      logTrace
    });

    return response.tag_id; // User transformer in case transformation is needed
  };
}
module.exports = createTagsService;
