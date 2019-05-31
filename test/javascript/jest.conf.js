module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  rootDir: '../../',
  roots: ['<rootDir>', '<rootDir>/app', '<rootDir>/lib' ],
  testURL: 'http://localhost/',
  coverageDirectory: '<rootDir>/target/test-results/',
  testMatch: ['<rootDir>/test/javascript/spec/**/+(*.)+(spec.ts?(x))'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ["lib", "node_modules", "bower_components"],
  moduleNameMapper: {
    'app/(.*)': '<rootDir>/app/$1',
    '^lib/(.*)': '<rootDir>/lib/$1',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  reporters: [
    'default',
    [ 'jest-junit', { output: './target/test-results/jest/TESTS-results.xml' } ]
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  setupFiles: [
    '<rootDir>/test/javascript/spec/enzyme-setup.ts',
    '<rootDir>/test/javascript/spec/storage-mock.ts'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.test.json'
    }
  },
  verbose: true,
};
