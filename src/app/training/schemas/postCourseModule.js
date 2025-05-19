const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postCourseModule = {
  tags: ["COURSES"],
  summary: "This API is to update module in course",
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
      additionalProperties: false,
      required: ["module_number", "title", "content_type"],
      properties: {
        module_number: { type: "number" },
        title: { type: "string" },
        description: { type: "string" },
        expected_time: { type: "number" },
        content_type: { type: "string", enum: ["TEXT", "VIDEO"] },
        video_url: { type: "string" }
      },
      allOf: [
        {
          if: {
            properties: {
              content_type: { const: "VIDEO" }
            }
          },
          then: {
            required: ["video_url", "expected_time"]
          }
        },
        {
          if: {
            properties: {
              content_type: { const: "TEXT" }
            }
          },
          then: {
            required: ["description"]
          }
        }
      ]
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

module.exports = postCourseModule;
