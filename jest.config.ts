/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  reporters: ['default',  ['jest-sonar', {
    outputDirectory: 'coverage',
    outputName: 'test-report.xml',
    reportedFilePath: 'relative'
  }]],
  testMatch: ['**/**/*.spec.ts'],
  
};