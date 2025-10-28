import axios from "axios";
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:4000/api",
  timeout: 5000,
});

export default client;