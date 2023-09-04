const request = require("supertest");

function createRequestJSONTo(app) {
  return {
    get: (url) => request(app).get(url).set("Accept", "application/json"),
    post: (url) => request(app).post(url).set("Accept", "application/json"),
    put: (url) => request(app).put(url).set("Accept", "application/json"),
    patch: (url) => request(app).patch(url).set("Accept", "application/json"),
    delete: (url) => request(app).delete(url).set("Accept", "application/json"),
  };
}

module.exports = {
  createRequestJSONTo,
};
