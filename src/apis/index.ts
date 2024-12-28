import axios from "axios";

// https://www.freetestapi.com/apis/todos
export const instance = axios.create({
  baseURL: "https://www.freetestapi.com/api/v1",
  timeout: 10000,
});
