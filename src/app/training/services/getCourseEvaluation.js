const courseEvaluationRepo = require("../repository/course_evaluation");

function getCourseEvaluationService(fastify) {
  const { getCourseEvaluationUserID, getCourseEvaluationUserCourseID } =
    courseEvaluationRepo(fastify);

  return async ({ query, logTrace }) => {
    const knex = await fastify.knex;
    let response;

    const { user_id, course_id } = query;
    if (Object.keys(query).length === 1) {
      response = await getCourseEvaluationUserID.call(knex, {
        data: { user_id },
        logTrace
      });
    } else if (Object.keys(query).length === 2) {
      response = await getCourseEvaluationUserCourseID.call(knex, {
        data: { user_id, course_id },
        logTrace
      });
    }

    return response;
  };
}

module.exports = getCourseEvaluationService;
