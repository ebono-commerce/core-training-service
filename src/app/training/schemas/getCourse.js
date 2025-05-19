const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getCourse = {
  tags: ["COURSES"],
  summary: "This API is to get a course",
  params: {
    type: "object",
    properties: {
      course_id: { type: "string" },
      user_id: { type: "string" },
      status: { type: "string", enum: ["ASSIGNED", "UNASSIGNED"] }
    }
  },
  headers: { $ref: "request-headers#" },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          course_id: { type: "string" },
          course_name: { type: "string" },
          description: { type: "string" },
          course_category: { type: "string" },
          is_completed: { type: "boolean" },
          is_assigned: { type: "boolean" },
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
                  enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
                  default: "NOT_STARTED"
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
          evaluations: {
            type: "array",
            items: {
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
            }
          },
          audit: { $ref: "response-audit#" }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getCourse;
