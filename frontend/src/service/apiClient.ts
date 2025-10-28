import axios from "axios";

/**
 * Temporary API client. Update baseURL when backend is available.
 * For now, functions return rejected promises or local mocks.
 */

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:4000/api",
  timeout: 5000,
});

export default client;
