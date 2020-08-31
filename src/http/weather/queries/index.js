import get from "./get";

export default ({ client }) => ({
  get: {
    default: get.default,
    query: async ({ city }) => get.query({ client, q: city }),
  },
});
