const getUserCourseAnalyticsRepo = require("../repository/user_course_analytics");

function postCourseAnalyticsFetchService(fastify) {
  const { fetchCourseUserAnalytics } = getUserCourseAnalyticsRepo(fastify);

  return async ({ body, logTrace }) => {
    return fetchCourseUserAnalytics.call(fastify.knex, {
      input: body,
      logTrace
    });
  };
}
module.exports = postCourseAnalyticsFetchService;
