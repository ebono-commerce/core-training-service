const postCourseAttendanceService = require("../services/postCourseAttendance");

function postCourseAttendanceHandler(fastify) {
  const postCourseAttendance = postCourseAttendanceService(fastify);
  return async (request, reply) => {
    const { body, params, logTrace } = request;
    const response = await postCourseAttendance({ body, params, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = postCourseAttendanceHandler;
