const { logQuery } = require("../../commons/helpers");
const { USER_MODULE_ANALYTICS } = require("../commons/model");

function postModuleAnalyticsRepo(fastify) {
  async function postModuleAnalytics({ data, logTrace }) {
    const knex = this;

    const query = knex(USER_MODULE_ANALYTICS.NAME)
      .insert(data)
      .onConflict([
        USER_MODULE_ANALYTICS.COLUMNS.USER_ID,
        USER_MODULE_ANALYTICS.COLUMNS.MODULE_NUMBER,
        USER_MODULE_ANALYTICS.COLUMNS.COURSE_ID
      ])
      .merge();

    logQuery({
      logger: fastify.log,
      query,
      context: "Post User module analytics",
      logTrace
    });

    await query;
    return { success: true };
  }

  async function getModuleAnalytics({ data, logTrace }) {
    const knex = this;

    const query = knex
      .select("*")
      .from(USER_MODULE_ANALYTICS.NAME)
      .where(USER_MODULE_ANALYTICS.COLUMNS.USER_ID, data.user_id)
      .andWhere(USER_MODULE_ANALYTICS.COLUMNS.MODULE_NUMBER, data.module_number)
      .andWhere(USER_MODULE_ANALYTICS.COLUMNS.STATUS, "COMPLETED");

    logQuery({
      logger: fastify.log,
      query,
      context: "Get User module analytics",
      logTrace
    });

    const response = await query;
    return { success: Boolean(response.length) };
  }

  return {
    postModuleAnalytics,
    getModuleAnalytics
  };
}
module.exports = postModuleAnalyticsRepo;
