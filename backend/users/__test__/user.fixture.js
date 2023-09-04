const { faker } = require("@faker-js/faker");

const githubUserId = () =>
  faker.datatype.number({
    min: 1000000,
    max: 9999999,
  });

const user = {
  phoneNumber: faker.phone.number(),
  favoriteGithubUsers: Array.from({ length: 10 }, (_) => githubUserId()),
};

module.exports = user;
