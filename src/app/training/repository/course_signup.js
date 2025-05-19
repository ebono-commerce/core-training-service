const { logQuery } = require("../../commons/helpers");
const { COURSE_SIGNUP } = require("../commons/model");

function courseSignupRepo(fastify) {
  async function postCourseSignup({ data, logTrace }) {
    const knex = this;

    const query = knex(COURSE_SIGNUP.NAME).insert(data);

    logQuery({
      logger: fastify.log,
      query,
      context: "Course Signup",
      logTrace
    });

    await query;
    return { success: true };
  }

  async function getCourseSignup({ data, logTrace }) {
    const knex = this;

    const query = knex
      .select("*")
      .from(COURSE_SIGNUP.NAME)
      .where(COURSE_SIGNUP.COLUMNS.COURSE_ID, data.course_id)
      .andWhere(COURSE_SIGNUP.COLUMNS.USER_ID, data.user_id);

    logQuery({
      logger: fastify.log,
      query,
      context: "Course Signup",
      logTrace
    });

    const response = await query;
    return { success: Boolean(response.length) };
  }

  return {
    postCourseSignup,
    getCourseSignup
  };
}

module.exports = courseSignupRepo;
