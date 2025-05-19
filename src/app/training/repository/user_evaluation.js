const { logQuery } = require("../../commons/helpers");
const { COURSE_USER_EVALUATION } = require("../commons/model");

function postUserEvaluationRepo(fastify) {
  async function postCourseEvaluation({ data, logTrace }) {
    const knex = this;

    const query = knex(COURSE_USER_EVALUATION.NAME).insert(data);

    logQuery({
      logger: fastify.log,
      query,
      context: "Course user evaluation",
      logTrace
    });

    await query;
    return { success: true };
  }

  return {
    postCourseEvaluation
  };
}

module.exports = postUserEvaluationRepo;
