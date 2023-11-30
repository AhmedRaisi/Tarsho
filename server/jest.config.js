module.exports = {
    testEnvironment: 'node',
    testTimeout: 30000,
    setupFilesAfterEnv: ['./jest.setup.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    // ... other configurations
  };
  