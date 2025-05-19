const { logQuery } = require("../../commons/helpers");
const { COURSE_TAG_MAPPING } = require("../commons/model");

function courseTagMapRepo(fastify) {
  async function mapCourseTag({ data, logTrace }) {
    const knex = this;

    const query = knex(COURSE_TAG_MAPPING.NAME).insert(data);

    logQuery({
      logger: fastify.log,
      query,
      context: "Course Tag map",
      logTrace
    });

    const response = await query;
    return response;
  }

  async function deleteCourseTag({ course_id, logTrace }) {
    const knex = this;

    const query = knex(COURSE_TAG_MAPPING.NAME)
      .where(COURSE_TAG_MAPPING.COLUMNS.COURSE_ID, course_id)
      .del();

    logQuery({
      logger: fastify.log,
      query,
      context: "Delete tag mapped to course",
      logTrace
    });

    await query;
    return { success: true };
  }

  return {
    mapCourseTag,
    deleteCourseTag
  };
}

module.exports = courseTagMapRepo;
