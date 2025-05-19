const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postUserEvaluation = {
  tags: ["COURESE"],
  summary: "This API is capture user evalution",
  headers: { $ref: "request-headers#" },
  params: {
    type: "object",
    required: ["course_id", "user_id"],
    properties: {
      course_id: { type: "string" },
      user_id: { type: "string" }
    }
  },
  body: {
    type: "object",
    items: {
      type: "object",
      required: ["evaluations"],
      properties: {
        evalutions: {
          type: "array",
          items: {
            type: "object",
            required: ["question_id"],
            additionalProperties: false,
            properties: {
              question_id: { type: "string" },
              answer_text: { type: "string" },
              option_id: { type: "string" }
            },
            anyOf: [{ required: ["answer_text"] }, { required: ["option_id"] }]
          }
        }
      }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" }
      }
    },
    ...errorSchemas
  }
};

module.exports = postUserEvaluation;
