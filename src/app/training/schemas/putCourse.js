const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postAddCourse = {
  tags: ["COURSES"],
  summary: "This API is to create a course",
  headers: { $ref: "request-headers#" },
  params: {
    type: "object",
    required: ["course_id"],
    properties: {
      course_id: { type: "string" }
    }
  },
  body: {
    type: "object",
    additionalProperties: false,
    required: [
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
        enum: ["PRODUCT", "SYSTEM", "SOFT_SKILLS"]
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
      // evaluations: {
      //   type: "array",
      //   items: {
      //     type: "string"
      //   }
      // },
      audit: {
        $ref: "request-audit#"
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

module.exports = postAddCourse;
