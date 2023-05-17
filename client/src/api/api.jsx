import axios from "axios";
import { BASE_API_DOMAIN } from "../config/appConfig";

export const api = axios.create({
  baseURL: `${BASE_API_DOMAIN}/api`,
  withCredentials: true,
});
