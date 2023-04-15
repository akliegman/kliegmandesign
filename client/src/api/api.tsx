// @ts-nocheck
import axios from "axios";
import { appConfig } from "../config/appConfig";

export const api = axios.create({
  baseURL: `${appConfig.baseApiDomain}/api`,
  withCredentials: true,
});
