module.exports = {
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  collectCoverageFrom: ["src/**/*.js", "!src/server.js"],
  testMatch: ["**/tests/**/*.test.js"],
};
