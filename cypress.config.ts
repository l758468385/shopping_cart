export default {
  components: {
    components: "src",
    testFiles: "**/*.spec.{js,jsx,ts,tsx}",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
