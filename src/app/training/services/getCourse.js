const courseRepo = require("../repository/courses");

function getCourseService(fastify) {
  const { getCourse } = courseRepo(fastify);

  return async ({ query, logTrace }) => {
    const { course_id, user_id, status = "ASSIGNED" } = query;
    const response = await getCourse.call(fastify.knex, {
      course_id,
      user_id,
      status,
      logTrace
    });

    const results = response.map(item => {
      const {
        user_module_analytics_statuses,
        modules,
        user_evaluation = [],
        ...rest
      } = item;
      return {
        ...rest,
        is_completed: Boolean(user_evaluation.length),
        modules: modules.map(module_item => {
          const statuses = user_module_analytics_statuses
            ? user_module_analytics_statuses[item.course_id]
            : null;

          return {
            ...module_item,
            status: statuses
              ? statuses[module_item.module_number]
              : "NOT_STARTED"
          };
        })
      };
    });

    return results;
  };
}

module.exports = getCourseService;
