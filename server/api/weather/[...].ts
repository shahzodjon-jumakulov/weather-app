export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseURL = config.weather.baseURL;
  let url = event.context.params!._;
  if (event.node.res.req.url?.split("?").length == 2) {
    url = event.node.res.req.url.replace("/api/weather", "");
  }
  return await $fetch(url, {
    baseURL: baseURL,
    query: {
      key: config.weather.apiKey,
    },
  });
});
