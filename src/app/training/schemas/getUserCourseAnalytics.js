const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getUserCourseAnalytics = {
  tags: ["COURESE"],
  summary: "This API is get user evalution",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    required: ["course_id", "user_id"],
    properties: {
      course_id: { type: "string" },
      user_id: { type: "string" }
    }
  },

  response: {
    200: {
      type: "object",
      properties: {
        course_id: { type: "string" },
        course_name: { type: "string" },
        description: { type: "string" },
        course_category: { type: "string" },
        is_completed: { type: "boolean" },
        show_answers: { type: "boolean" },
        tags: {
          type: "array",
          items: {
            tag_id: { type: "string" },
            tag: { type: "string" }
          }
        },
        audience: { type: "string" },
        complexity_level: { type: "string" },
        modules: {
          type: "array",
          items: {
            type: "object",
            properties: {
              status: {
                type: "string",
                enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]
              },
              module_number: { type: "integer" },
              title: { type: "string" },
              description: { type: "string" },
              expected_time: { type: "number" },
              content_type: { type: "string" },
              video_url: { type: "string" }
            }
          }
        },
        total_questions: { type: "number" },
        evaluation_score: { type: "number" },
        evaluations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              is_correct: { type: "boolean" },
              question_id: { type: "string" },
              type: { type: "string" },
              question_text: { type: "string" },
              correct_answer_text: { type: "string" },
              answer_text: { type: "string" },
              options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    is_correct: { type: "boolean" },
                    is_selected: { type: "boolean" },
                    option_id: { type: "string" },
                    option_text: { type: "string" },
                    is_correct_option: { type: "boolean" }
                  }
                }
              }
            }
          }
        },
        audit: { $ref: "response-audit#" }
      }
    },
    ...errorSchemas
  }
};

module.exports = getUserCourseAnalytics;
