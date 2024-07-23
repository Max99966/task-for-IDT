module.exports = {
    moduleFileExtensions: ["js", "json"],
    testEnvironment: 'node',
    testEnvironmentOptions: {
        NODE_ENV: 'test'
    },
    setupFiles: ["dotenv/config", '<rootDir>/globalErrorReporter.js'],
    rootDir: './',
    testMatch: ['**/Tests/**/**/*.js?(x)'],
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: ['node_modules', 'src/config', 'index.js', 'test'],
    coverageReporters: ['text', 'lcov', 'clover', 'html'],
    testResultsProcessor: "./node_modules/jest-html-reporter",
    verbose: true,
    reporters: [
        'default'
    ]
};