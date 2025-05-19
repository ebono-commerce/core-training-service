const { StatusCodes } = require("http-status-codes");
const courseSignupRepo = require("../repository/course_signup");
const { CustomError } = require("../../errorHandler");

function postCourseSignupService(fastify) {
  const { postCourseSignup, getCourseSignup } = courseSignupRepo(fastify);

  return async ({ body, params, logTrace }) => {
    const data = {
      ...body,
      ...params
    };

    const response = await getCourseSignup.call(fastify.knex, {
      data,
      logTrace
    });

    if (response.success) {
      throw CustomError.create({
        httpCode: StatusCodes.CONFLICT,
        message: "Course is already assiged to given user.",
        property: "",
        code: "CONFLICT"
      });
    }

    const updateddata = body.user_id.map(item => {
      return {
        user_id: item,
        created_user_id: body.created_user_id,
        ...params,
        created_at: new Date().toISOString()
      };
    });

    await postCourseSignup.call(fastify.knex, {
      data: updateddata,
      logTrace
    });

    return { success: true };
  };
}
module.exports = postCourseSignupService;
