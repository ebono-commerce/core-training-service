const getUserCourseAnalyticsRepo = require("../repository/user_course_analytics");

function getUserCourseAnalyticsService(fastify) {
  const { getUserCourseAnalytics, getUserModuleAnalytics } =
    getUserCourseAnalyticsRepo(fastify);

  return async ({ query, logTrace }) => {
    const { user_id, course_id } = query;
    const knex = await fastify.knex;
    const userModuleAnalytics = await getUserModuleAnalytics.call(knex, {
      data: { user_id, course_id },
      logTrace
    });

    const userModuleAnalyticsMap = userModuleAnalytics.reduce((acc, curr) => {
      acc[curr.module_number] = curr.status;
      return acc;
    }, {});

    let response = await getUserCourseAnalytics.call(knex, {
      data: { user_id, course_id },
      logTrace
    });

    const { evaluations, user_evaluation, modules, ...rest } = response;
    const updated_response = {
      ...rest,
      show_answers: user_evaluation.length > 0,
      is_completed: user_evaluation.length > 0,
      modules: modules.map(item => {
        return {
          ...item,
          status: userModuleAnalyticsMap[item.module_number] || "NOT_STARTED"
        };
      }),
      ...(user_evaluation.length > 0 && {
        evaluations: user_evaluation[0].evaluations,
        evaluation_score: user_evaluation[0].evaluation_score,
        total_questions: user_evaluation[0].total_questions
      })
    };
    return updated_response;
  };
}
module.exports = getUserCourseAnalyticsService;
