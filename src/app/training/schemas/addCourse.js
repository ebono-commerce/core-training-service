const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postAddCourse = {
  tags: ["COURSES"],
  summary: "This API is to create a course",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    additionalProperties: false,
    required: [
      "modules",
      "course_name",
      "description",
      "course_category",
      "tags",
      "complexity_level",
      "audit"
    ],
    properties: {
      course_name: { type: "string" },
      description: { type: "string" },
      course_category: {
        type: "string",
        enum: ["PRODUCT", "SYSTEM", "SOFT_SKILLS", "PROCESS", "HR_INDUCTION", "CUSTOMER_EXCELLENCE"]
      },
      tags: {
        type: "array",
        items: {
          type: "string"
        }
      },
      audience: { type: "string" },
      complexity_level: {
        type: "string",
        enum: ["BEGINNER", "INTERMEDIATE", "EXPERT"]
      },
      modules: {
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
      audit: {
        $ref: "request-audit#"
      }
    }
  },
  response: {
    201: {
      type: "object",
      properties: {
        course_id: { type: "string" }
      }
    },
    ...errorSchemas
  }
};

module.exports = postAddCourse;
