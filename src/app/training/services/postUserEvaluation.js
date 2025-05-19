const courseRepo = require("../repository/courses");
const postUserEvaluationRepo = require("../repository/user_evaluation");

const getTransformedData = ({ user_input, data }) => {
  const userDataMap = user_input.reduce((acc, curr) => {
    acc[curr.question_id] = curr;
    return acc;
  }, {});

  const results = data.map(item => {
    const { answer_text, option_id } = userDataMap[item.question_id];

    if (item.type === "TEXT") {
      return {
        ...item,
        answer_text: answer_text,
        is_correct: answer_text == item.correct_answer_text
      };
    } else
      return {
        ...item,
        is_correct: item.options
          .filter(({ is_correct_option }) => is_correct_option)
          .every(item => option_id.includes(item.option_id)),
        options: item.options.map(option => {
          return {
            ...option,
            is_selected: option_id.includes(option.option_id)
          };
        })
      };
  });

  return results;
};

function postUserEvaluationService(fastify) {
  const { getCourse } = courseRepo(fastify);
  const { postCourseEvaluation } = postUserEvaluationRepo(fastify);

  return async ({ body, logTrace, params }) => {
    const { course_id, user_id } = params;

    const course_response = await getCourse.call(fastify.knex, {
      course_id,
      logTrace
    });

    const evalutions = course_response[0].evaluations;

    const data = getTransformedData({
      user_input: body.evaluations,
      data: evalutions
    });

    const response = await postCourseEvaluation.call(fastify.knex, {
      data: {
        evaluations: JSON.stringify(data),
        total_questions: data.length,
        evaluation_score: data.filter(({ is_correct }) => is_correct).length,
        course_id,
        user_id,
        completed_at: new Date().toISOString()
      },
      logTrace
    });

    return response;
  };
}
module.exports = postUserEvaluationService;
