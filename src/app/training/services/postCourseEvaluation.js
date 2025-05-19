const courseRepo = require("../repository/courses");
const ShortUniqueId = require("short-unique-id");
const { randomUUID } = new ShortUniqueId({ length: 10 });

const transformEvalutions = body => {
  const data = body.map(item => {
    const { type, question_id, ...rest } = item;
    if (type === "TEXT") {
      return {
        ...rest,
        type,
        question_id: question_id ? question_id : randomUUID()
      };
    } else {
      return {
        ...rest,
        type,
        question_id: question_id ? question_id : randomUUID(),
        options: rest.options.map(item => {
          return {
            ...item,
            option_id: item.option_id ? item.option_id : randomUUID()
          };
        })
      };
    }
  });

  return data;
};

function postCourseEvaluationService(fastify) {
  const { updateEvalution } = courseRepo(fastify);

  return async ({ body, logTrace, params }) => {
    const { course_id } = params;

    const response = await updateEvalution.call(fastify.knex, {
      data: JSON.stringify(transformEvalutions(body)),
      course_id,
      logTrace
    });

    return response;
  };
}
module.exports = postCourseEvaluationService;
