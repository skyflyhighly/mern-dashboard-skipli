import axios from "axios";

function searchGithubUsers(phoneNumber, query, page, perPage) {
  return axios
    .get("http://localhost:3000/users/search-github-users", {
      params: {
        q: query,
        page,
        per_page: perPage,
        phone_number: phoneNumber,
      },
    })
    .catch((err) => console.error(err));
}

export default searchGithubUsers;
