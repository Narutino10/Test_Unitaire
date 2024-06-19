module.exports = {
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    coverageReporters: ['text', 'html'],
    reporters: [
      'default',
      [
        'jest-html-reporter',
        {
          pageTitle: 'Test Report',
          outputPath: 'tests_report.html',
          includeFailureMsg: true,
          includeSuiteFailure: true,
        },
      ],
    ],
  };
  