const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
    baseUrl: "https://microblog.cscc09.com",
  },
});
