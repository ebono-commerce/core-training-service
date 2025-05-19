const ShortUniqueId = require("short-unique-id");

const { randomUUID } = new ShortUniqueId({ length: 10 });
const evaluationRepo = require("../repository/evaluations");

function createEvaluationService(fastify) {
  const { createEvaluation } = evaluationRepo(fastify);

  return async ({ body, logTrace }) => {
    const evaluation = body;
    const knex = await fastify.knex;
    const response = await createEvaluation.call(knex, {
      data: {
        question_id: randomUUID(),
        option_id: randomUUID(),
        ...evaluation
      },
      logTrace
    });
    return response; // User transformer in case transformation is needed
  };
}
module.exports = createEvaluationService;
