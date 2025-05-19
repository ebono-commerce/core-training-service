const schemas = require("../schemas");
const handlers = require("../handlers");

module.exports = async fastify => {
  fastify.route({
    method: "POST",
    url: "/tags",
    schema: schemas.postAddTag,
    handler: handlers.createTag(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/tags",
    schema: schemas.getTags,
    handler: handlers.getTags(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/courses",
    schema: schemas.postAddCourse,
    handler: handlers.createCourse(fastify)
  });

  fastify.route({
    method: "PUT",
    url: "/courses/:course_id",
    schema: schemas.putCourse,
    handler: handlers.putCourse(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/courses",
    schema: schemas.getCourse,
    handler: handlers.getCourse(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/courses/:course_id/modules",
    schema: schemas.postCourseModule,
    handler: handlers.postCourseModule(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/courses/:course_id/evaluations",
    schema: schemas.postCourseEvaluation,
    handler: handlers.postCourseEvaluation(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/courses/:course_id/signup",
    schema: schemas.postCourseSignup,
    handler: handlers.postCourseSignup(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/courses/:course_id/attendance",
    schema: schemas.postCourseAttendance,
    handler: handlers.postCourseAttendance(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/courses/:course_id/module-analytics",
    schema: schemas.postModuleAnalytics,
    handler: handlers.postModuleAnalytics(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/courses/:course_id/user/:user_id/evaluations",
    schema: schemas.postUserEvaluation,
    handler: handlers.postUserEvaluation(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/courses/analytics",
    schema: schemas.getUserCourseAnalytics,
    handler: handlers.getUserCourseAnalytics(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/courses/analytics/fetch",
    schema: schemas.postCourseAnalyticsFetch,
    handler: handlers.postCourseAnalyticsFetch(fastify)
  });
  //DONT_REMOVE_ADD_NEW_ROUTE
};
