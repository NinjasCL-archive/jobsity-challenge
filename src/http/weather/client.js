import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import shared from "../shared";

const root = process.env.REACT_APP_WEATHER_API;

const name = "weather";

const base = root;

const cache = setupCache({
  // default 5 minutes (300000 milliseconds) cache
  // minutes hours milliseconds
  maxAge: 5 * 60 * 1000,
});

const http = axios.create({
  adapter: cache.adapter,
});

const client = {
  name,
  endpoints: { root, base },
  http,
  cache,
  axios,
  shared,
};

export default client;
