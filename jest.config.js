// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
        "./src/setupTests.js"
    ],
    modulePathIgnorePatterns: [
      'src/ui/'
    ]
  };
  
module.exports = config;