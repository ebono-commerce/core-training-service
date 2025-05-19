const evaluationRepo = require("../repository/evaluations");

function getEvaluationService(fastify) {
  const { getEvaluationById } = evaluationRepo(fastify);

  return async ({ query, logTrace }) => {
    const { question_id } = query;
    const knex = await fastify.knex;
    const response = await getEvaluationById.call(knex, {
      data: { question_id },
      logTrace
    });
    return response;
  };
}

module.exports = getEvaluationService;
