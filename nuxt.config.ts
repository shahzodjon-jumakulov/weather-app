// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    weather: {
      apiKey: process.env.WEATHER_API,
      baseURL: process.env.WEATHER_BASE_URL,
    },
  },
  modules: ["@nuxtjs/color-mode"],
  css: ["~/assets/css/main.scss"],
  colorMode: {
    classSuffix: '',
  }
});
