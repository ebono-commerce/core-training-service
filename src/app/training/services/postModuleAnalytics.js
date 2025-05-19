const courseRepo = require("../repository/courses");
const postModuleAnalyticsRepo = require("../repository/user_module_analytics");

function postModuleAnalyticsService(fastify) {
  const { postModuleAnalytics, getModuleAnalytics } =
    postModuleAnalyticsRepo(fastify);
  const { getCourse } = courseRepo(fastify);

  return async ({ body, params, logTrace }) => {
    const { course_id } = params;

    const moduleAnalyticsResponse = await getModuleAnalytics.call(
      fastify.knex,
      {
        data: {
          ...body,
          course_id: course_id
        },
        logTrace
      }
    );

    if (moduleAnalyticsResponse.success) {
      return { success: true };
    }

    const response = await getCourse.call(fastify.knex, {
      course_id: course_id,
      logTrace
    });

    const { modules } = response[0];

    const { title, expected_time } = modules.find(
      ({ module_number }) => module_number === body.module_number
    );

    await postModuleAnalytics.call(fastify.knex, {
      data: {
        // title,
        // expected_time: expected_time || 0,
        course_id,
        ...body
      },
      logTrace
    });

    return { success: true };
  };
}
module.exports = postModuleAnalyticsService;
