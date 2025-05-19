const { getAuditInfoForUpdate } = require("../../commons/helpers");
const courseTagMapRepo = require("../repository/course_tag_map");
const courseRepo = require("../repository/courses");

function putCourseService(fastify) {
  const { putCourse } = courseRepo(fastify);
  const { mapCourseTag, deleteCourseTag } = courseTagMapRepo(fastify);

  return async ({ body, logTrace, params }) => {
    const knexTrx = await fastify.knex.transaction();

    const { course_id } = params;

    const { tags, audit, ...rest } = body;
    try {
      await deleteCourseTag.call(knexTrx, {
        course_id,
        logTrace
      });

      await putCourse.call(knexTrx, {
        course_id,
        data: {
          ...rest,
          audit: getAuditInfoForUpdate({ audit })
        },
        logTrace
      });

      const tagsToInsert = tags.map(tag_id => ({
        course_id: course_id,
        tag_id
      }));

      await mapCourseTag.call(knexTrx, { data: tagsToInsert });

      await knexTrx.commit();
      return { success: true };
    } catch (error) {
      await knexTrx.rollback();
      throw error;
    }
  };
}

module.exports = putCourseService;
