const { logQuery } = require("../../commons/helpers");
const { MODULE } = require("../commons/model");

function moduleRepo(fastify) {
  async function createModule({ data, logTrace }) {
    const knex = this;

    const query = knex(MODULE.NAME)
      .returning(MODULE.COLUMNS.MODULE_ID)
      .insert(data);

    logQuery({
      logger: fastify.log,
      query,
      context: "Create Module",
      logTrace
    });

    const response = await query;
    return { module_id: response[0] };
  }

  async function updateModule({ data, module_id, logTrace }) {
    const knex = this;

    const query = knex(MODULE.NAME)
      .returning(MODULE.COLUMNS.MODULE_ID)
      .where(MODULE.COLUMNS.MODULE_ID, module_id)
      .update({
        [MODULE.COLUMNS.TITLE]: data.title,
        [MODULE.COLUMNS.DESCRIPTION]: data.description,
        [MODULE.COLUMNS.EXPECTED_TIME]: data.expected_time,
        [MODULE.COLUMNS.CONTENT_TYPE]: data.content_type,
        [MODULE.COLUMNS.VIDEO_URL]: data.video_url
      });

    logQuery({
      logger: fastify.log,
      query,
      context: "Update Module",
      logTrace
    });

    const response = await query;
    return { module_id: response[0] };
  }

  async function getModules({ logTrace }) {
    const knex = this;

    // * get tags by id
    const query = knex("module").select("*");

    logQuery({
      logger: fastify.log,
      query,
      context: "Get Modules",
      logTrace
    });

    const response = await query;
    return response;
  }

  async function getModuleById({ data, logTrace }) {
    const knex = this;

    // * get module by id
    const query = knex(MODULE.NAME)
      .where({
        [MODULE.COLUMNS.MODULE_ID]: data.module_id
      })
      .select("*");

    logQuery({
      logger: fastify.log,
      query,
      context: "Get Module by ID",
      logTrace
    });

    const response = await query;
    return response;
  }

  return {
    createModule,
    getModules,
    getModuleById,
    updateModule
  };
}

module.exports = moduleRepo;
