const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postUpdateEvaluation = {
  tags: ["COURSES"],
  summary: "This API is to create an evaluation",
  headers: { $ref: "request-headers#" },
  params: {
    type: "object",
    required: ["course_id"],
    properties: {
      course_id: { type: "string" }
    }
  },
  body: {
    type: "array",
    items: {
      type: "object",
      required: ["type", "question_text"],
      additionalProperties: false,
      properties: {
        type: { type: "string", enum: ["TEXT", "CHOICE", "MULTI_CHOICE"] },
        question_text: { type: "string" },
        question_id: { type: "string" },
        correct_answer_text: { type: "string" },
        options: {
          type: "array",
          minItems: 2,
          items: {
            type: "object",
            required: ["option_text", "is_correct_option"],
            additionalProperties: false,
            properties: {
              option_id: { type: "string" },
              option_text: { type: "string" },
              is_correct_option: { type: "boolean" }
            }
          }
        }
      }
    }
  },
  response: {
    201: {
      type: "object",
      properties: {
        success: { type: "boolean" }
      }
    },
    ...errorSchemas
  }
};

module.exports = postUpdateEvaluation;
