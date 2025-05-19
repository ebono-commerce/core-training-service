const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postCourseSignup = {
  tags: ["COURSES"],
  summary: "This API is to create a course signup",
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
    required: ["user_id", "created_user_id"],
    additionalProperties: false,
    properties: {
      user_id: {
        type: "array",
        items: {
          type: "string"
        }
      },
      created_user_id: { type: "string" }
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

module.exports = postCourseSignup;
