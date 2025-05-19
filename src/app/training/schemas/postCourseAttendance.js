const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postCourseAttendance = {
  tags: ["COURSES"],
  summary: "This API is to create a course attendance",
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
    required: ["user_id"],
    properties: {
      user_id: { type: "string" }
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

module.exports = postCourseAttendance;
