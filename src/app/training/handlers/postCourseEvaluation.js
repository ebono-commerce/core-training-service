const postCourseEvaluationService = require("../services/postCourseEvaluation");

function postCourseEvaluationHandler(fastify) {
  const postCourseEvaluation = postCourseEvaluationService(fastify);
  return async (request, reply) => {
    const { body, params, logTrace } = request;
    const response = await postCourseEvaluation({ body, params, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = postCourseEvaluationHandler;
