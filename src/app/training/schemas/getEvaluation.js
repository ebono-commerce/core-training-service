const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getEvaluation = {
  tags: ["EVALUATION"],
  summary: "This API is to get an evaluation",
  headers: { $ref: "request-headers#" },
  response: {
    200: {
      type: "object",
      properties: {
        question_id: { type: "string" },
        type: { type: "string" },
        question_text: { type: "string" },
        correct_answer_text: { type: "string" },
        options: {
          type: "array",
          items: {
            type: "object",
            properties: {
              option_id: { type: "string" },
              option_text: { type: "string" },
              is_correct_option: { type: "boolean" }
            }
          }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getEvaluation;
