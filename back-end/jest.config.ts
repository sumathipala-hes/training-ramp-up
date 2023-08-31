module.exports = {
  // Basic configuration
  testEnvironment: 'node', // Use Node.js environment for testing

  // Modules that should be mocked
  moduleNameMapper: {
    '^@root/(.*)$': '<rootDir>/$1', // Add any custom module aliases here
  },

  // Optional: If you want to use TypeScript with Jest
  preset: 'ts-jest',
}
