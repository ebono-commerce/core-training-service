const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getCourseEvaluation = {
  tags: ["COURSES"],
  summary: "This API is to get list of all course evaluations",
  headers: { $ref: "request-headers#" },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          course_id: { type: "string" },
          user_id: { type: "string" },
          evaluation: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question_id: { type: "string" },
                answer_text: { type: "string" },
                option_id: {
                  type: "array",
                  items: { type: "string" }
                }
              }
            }
          },
          completed_at: { type: "string" },
          status: { type: "string" }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getCourseEvaluation;
