const { create } = require("../../../../index");
const createTagservice = require("../../services/createTags");

jest.mock("knex", () => () => ({}));
jest.mock("../../../commons/helpers", () => ({
  connectionCheck: jest.fn().mockResolvedValue()
}));

jest.mock("../../services/createTags");

const mockedFunc = jest.fn().mockResolvedValue({
  user_id: "some uuid"
});

createTagservice.mockReturnValueOnce(mockedFunc);

describe("Create User handlers test", () => {
  let fastify;
  const headers = {
    authorization: "",
    "x-channel-id": "WEB"
  };
  beforeAll(async () => {
    fastify = create();
    await fastify.ready();
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await fastify.close();
  });

  test("It should return 400 when mandatory params are not passed", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/v1/users",
      accept: "application/json",
      headers
    });

    expect(response.statusCode).toBe(400);
  });

  test("It should return 200 when mandatory params are passed", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/v1/users",
      accept: "application/json",
      headers,
      payload: {
        full_name: "some kumar some",
        phone_number: {
          country_code: "+91",
          number: "8109810909"
        }
      }
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual({
      user_id: "some uuid"
    });
  });
});
