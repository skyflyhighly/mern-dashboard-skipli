const router = require("express").Router();
const AccessCode = require("./access_code");
const {
  LikeGithubUserRequest,
  VerifyUserRequest,
  AddUserRequest,
} = require("./user.requests");
const { GetUserProfileResponse } = require("./user.responses");

/**
 * @param {} userService
 * @see {@link ./users.service.js}
 *
 * @param {} smsService
 * @see twilioClient
 */
function usersRoute(userService, smsService) {
  router.post("/", async function (req, res) {
    const { phoneNumber } = AddUserRequest.parse(req.body);

    // Create new access code and store it in the database
    const accessCode = new AccessCode();
    await userService.addUser(phoneNumber, accessCode);

    try {
      // Send the access code to the registered phone number
      await smsService.sendMessage(phoneNumber, accessCode.toString());
      res.status(201).send();
    } catch (err) {
      res.status(400).send("Invalid phone number");
    }
  });

  router.post("/validate", async function (req, res) {
    const { accessCode, phoneNumber } = VerifyUserRequest.parse(req.body);
    const ac = AccessCode.fromString(accessCode);
    const result = await userService.verifyUser(phoneNumber, ac);
    if (result) {
      return res.status(200).send();
    }
    return res.status(400).send();
  });

  router.post("/like-github-user", async function (req, res) {
    // Notice the inconsistent naming here.
    // The `phone_number` and `github_user_id` are written in snake_case in this request, because they are specified in the document.
    // In other requests, we use camelCase for the properties in the request body, params, and queries
    const { phone_number: phoneNumber, github_user_id: githubUserId } =
      LikeGithubUserRequest.parse(req.body);
    await userService.likeGithubUser(phoneNumber, githubUserId);
    return res.status(200).json({ success: true });
  });

  router.get("/:phoneNumber/profile", async function (req, res) {
    const { phoneNumber } = req.params;
    const user = await userService.getUserByPhoneNumber(phoneNumber);
    const favoriteGithubUsersPromises = user.favoriteGithubUsers.map(
      (ghUserId) => userService.findGithubUserProfile(ghUserId)
    );
    const favoriteGithubUsers = await Promise.all(favoriteGithubUsersPromises);
    return res
      .status(200)
      .json({ favoriteGithubUsers });
  });

  router.get("/search-github-users", async function (req, res) {
    const { q, page, per_page, phone_number } = req.query;
    const users = await userService.searchGithubUsers(
      phone_number,
      q,
      page,
      per_page
    );
    return res.status(200).json(users);
  });

  return router;
}
module.exports = usersRoute;
