module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.*\\.(test|spec)\\.ts$',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
};
