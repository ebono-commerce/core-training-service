const courseAttendanceRepo = require("../repository/course_attendance");

function postCourseAttendanceService(fastify) {
  const { postCourseAttendance } = courseAttendanceRepo(fastify);

  return async ({ body, params, logTrace }) => {
    const response = await postCourseAttendance.call(fastify.knex, {
      data: {
        ...body,
        started_at: new Date().toISOString(),
        ...params
      },
      logTrace
    });
    return { success: true, ...response };
  };
}
module.exports = postCourseAttendanceService;
