/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom', // Changed from 'node' to 'jsdom'
  
  extensionsToTreatAsEsm: ['.ts'],
  
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          module: 'ESNext',
          moduleResolution: 'bundler',
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
  
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.ts$': '$1',
    '^konva$': '<rootDir>/node_modules/konva/konva.js',
  },
  
  transformIgnorePatterns: [
    'node_modules/(?!(konva)/)',
  ],
  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};