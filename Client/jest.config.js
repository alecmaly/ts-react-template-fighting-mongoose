module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  globals: {
    'babel-jest': {
      tsConfig: 'tsconfig.json',
      useBabelrc: true
    }
  },
  "setupFiles": [
    "<rootDir>/test-setup.js"
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/public/',
    '<rootDir>/dist/'
  ],
  transform: {
    '^.+\\.(ts|tsx|jsx)$': 'babel-jest' //ts-jest
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleNameMapper: {
    '\.(css|jpg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  collectCoverage: true,
  coverageReporters: ['html', 'text', 'json-summary'],
  "verbose": true
};
