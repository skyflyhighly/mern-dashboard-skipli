import axios from "axios";

export function createUser(phoneNumber) {
  return axios.post("http://localhost:3000/users", { phoneNumber });
}
