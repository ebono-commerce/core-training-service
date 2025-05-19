const postCourseSignupService = require("../services/postCourseSignup");

function postCourseSignupHandler(fastify) {
  const postCourseSignup = postCourseSignupService(fastify);
  return async (request, reply) => {
    const { body, params, logTrace } = request;
    const response = await postCourseSignup({ body, params, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = postCourseSignupHandler;
