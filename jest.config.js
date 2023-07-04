module.exports = {
  preset: 'jest-preset-default',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
  testEnvironment: 'node',
};
