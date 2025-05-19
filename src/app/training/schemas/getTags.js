const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getTags = {
  tags: ["TAGS"],
  summary: "This API is to get list of all tags",
  headers: { $ref: "request-headers#" },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tag_id: { type: "string" },
          tag: { type: "string" }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getTags;
