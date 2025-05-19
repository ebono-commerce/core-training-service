const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postCourseAnalyticsFetch = {
  tags: ["COURSES"],
  summary: "This API is to fetch course analytics",
  body: {
    type: "object",
    properties: {
      course_id: { type: "string" },
      user_id: { type: "string" },
      completed_at_from: { type: "string" },
      completed_at_to: { type: "string" }
    },
    anyOf: [
      {
        required: ["course_id"]
      },
      {
        required: ["user_id"]
      }
    ]
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          course_id: { tyep: "string" },
          course_name: { type: "string" },
          user_id: { type: "string" },
          started_at: { type: "string", nullable: true },
          completed_at: { type: "string", nullable: true },
          evaluation_score: { type: "integer", nullable: true },
          total_questions: { type: "integer", nullable: true }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = postCourseAnalyticsFetch;
