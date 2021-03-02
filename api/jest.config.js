module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  clearMocks: true,
  testRegex: ".*\.spec.js$",
};
