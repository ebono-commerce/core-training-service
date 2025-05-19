const postUserEvaluationService = require("../services/postUserEvaluation");

function postUserEvaluation(fastify) {
  const postUserEvaluation = postUserEvaluationService(fastify);
  return async (request, reply) => {
    const { params, logTrace, body } = request;
    const response = await postUserEvaluation({ params, logTrace, body });
    return reply.code(200).send(response);
  };
}

module.exports = postUserEvaluation;
