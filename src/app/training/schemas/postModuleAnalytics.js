const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postModuleAnalytics = {
  tags: ["COURSES"],
  summary: "This API is capture module analytics",
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
    required: ["user_id", "module_number", "status"],
    properties: {
      user_id: { type: "string" },
      module_number: { type: "number" },
      status: {
        type: "string",
        enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]
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

module.exports = postModuleAnalytics;
