const ShortUniqueId = require("short-unique-id");

const { randomUUID } = new ShortUniqueId({ length: 10 });
const courseRepo = require("../repository/courses");
const courseTagMapRepo = require("../repository/course_tag_map");
const { getAuditInfo } = require("../../commons/helpers");

const trasformCourseRequestForInsert = data => {
  return {
    course_id: randomUUID(),
    course_name: data.course_name,
    description: data.description,
    course_category: data.course_category,
    audience: data.audience,
    complexity_level: data.complexity_level,
    modules: JSON.stringify(data.modules),
    evaluations: JSON.stringify([]),
    audit: getAuditInfo(data)
  };
};

function createCourseService(fastify) {
  const { createCourse } = courseRepo(fastify);
  const { mapCourseTag } = courseTagMapRepo(fastify);

  return async ({ body, logTrace }) => {
    const knexTrx = await fastify.knex.transaction();

    try {
      const response = await createCourse.call(knexTrx, {
        data: trasformCourseRequestForInsert(body),
        logTrace
      });

      const tagsToInsert = body.tags.map(tag_id => ({
        course_id: response.course_id,
        tag_id
      }));

      await mapCourseTag.call(knexTrx, { data: tagsToInsert });

      await knexTrx.commit();
      return response;
    } catch (error) {
      await knexTrx.rollback();
      throw error;
    }
  };
}

module.exports = createCourseService;
