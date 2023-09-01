/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  collectCoverageFrom: [
    'src/routes/createStudent.ts',
    'src/services/studentServices.ts',
    'src/controllers/studentControllers.ts',
    'src/services/authService.ts',
    'src/controllers/authController.ts',
  ],
}
