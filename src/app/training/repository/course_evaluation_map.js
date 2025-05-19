const { logQuery } = require("../../commons/helpers");

function courseEvaluationMapRepo(fastify) {
  async function mapCourseEvaluation({ data, logTrace }) {
    const knex = this;

    const evaluationsToInsert = data.evaluations.map(question_id => ({
      course_id: data.course_id,
      question_id
    }));

    const query = knex("course_evaluation_mapping").insert(evaluationsToInsert);

    logQuery({
      logger: fastify.log,
      query,
      context: "Course Evaluation map",
      logTrace
    });

    const response = await query;
    return response;
  }

  return {
    mapCourseEvaluation
  };
}

module.exports = courseEvaluationMapRepo;
