const { logQuery } = require("../../commons/helpers");
const { TAG } = require("../commons/model");

function tagRepo(fastify) {
  async function createTag({ data, logTrace }) {
    const knex = this;

    const query = knex(TAG.NAME).returning(TAG.COLUMNS.TAG_ID).insert(data);

    logQuery({
      logger: fastify.log,
      query,
      context: "Create Tag",
      logTrace
    });

    const response = await query;
    return { tag_id: response[0] };
  }

  async function getTags({ logTrace }) {
    const knex = this;

    // * get tags by id
    const query = knex(TAG.NAME).select("*"); // ! enter query for GET here

    logQuery({
      logger: fastify.log,
      query,
      context: "Get Tags",
      logTrace
    });

    const response = await query;
    return response;
  }

  return {
    createTag,
    getTags
  };
}

module.exports = tagRepo;
