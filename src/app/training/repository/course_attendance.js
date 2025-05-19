const { logQuery } = require("../../commons/helpers");
const { COURSE_ATTENDANCE } = require("../commons/model");

function courseAttendanceRepo(fastify) {
  async function postCourseAttendance({ data, logTrace }) {
    const knex = this;

    // const query = knex(COURSE_ATTENDANCE.NAME).insert(data);
    const query = knex(COURSE_ATTENDANCE.NAME)
      .insert(data) 
      .onConflict(["course_id", "user_id"])
      .ignore();

    logQuery({
      logger: fastify.log,
      query,
      context: "Course Attendance",
      logTrace
    });

    await query;
    return {
      success: true
    };
  }

  return {
    postCourseAttendance
  };
}

module.exports = courseAttendanceRepo;
