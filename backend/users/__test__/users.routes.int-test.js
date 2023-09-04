const {
  createDatabaseConnection,
  clearData,
  dropConnection,
} = require("../../test/helpers/firestore_database");
const { createRequestJSONTo } = require("../../test/helpers/request");
const user = require("./user.fixture");
const express = require("express");
const userService = require("../users.service");
const userRouter = require("../users.routes");

describe("users", () => {
  let firebaseApp;
  let app;
  let db;
  let request;
  const smsService = {
    sendMessage: jest.fn((message) => Promise.resolve(message)),
  };

  beforeAll(() => {
    const connection = createDatabaseConnection();
    firebaseApp = connection.app;
    db = connection.db;
    app = express();
    app.use(express.json());
    app.use("/", userRouter(userService(db), smsService));
    request = createRequestJSONTo(app);
  });

  afterAll(() => dropConnection(firebaseApp));

  describe("successful user flow", () => {
    afterAll(() => clearData(db));

    it("create user successfully", async () => {
      const phoneNumber = user.phoneNumber;

      const response = await request.post("/").send({
        phoneNumber: phoneNumber,
      });

      expect(response.status).toEqual(201);
    });

    it("add favorite Github user successfully", async () => {
      const responses = await Promise.all(
        user.favoriteGithubUsers.map((githubUserId) =>
          request.post("/like-github-user").send({
            phone_number: user.phoneNumber,
            github_user_id: githubUserId,
          })
        )
      );
      const statuses = responses.map((response) => response.status);

      // All the responses must have status 200 OK
      expect(statuses).toEqual(
        Array.from({ length: statuses.length }, () => 200)
      );
    });

    it("get the favorite Github users successfully", async () => {
      const response = await request.get(`/${user.phoneNumber}/profile`);

      expect(response.status).toEqual(200);
      expect(response.body.favoriteGithubUsers).toEqual(
        expect.arrayContaining(user.favoriteGithubUsers)
      );
    });
  });
});
