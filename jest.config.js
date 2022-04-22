module.exports = {
    preset: 'jest-expo',
    testURL: 'http://localhost/',
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
        '^.+\\.tsx?$': 'ts-jest'
    },
    timers: "fake",
    testMatch: [
        '**/src/__tests__/**/*.ts?(x)',
        '**/src/**/?(*.)+(spec|test).ts?(x)',
        '**/pipeline/**/__tests__/**/*.js'
    ],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    modulePathIgnorePatterns: ['env/*'],
    globals: {
        'ts-jest': {
            tsConfig: {
                jsx: 'react'
            }
        }
    },
    coverageThreshold: {
        'global': {
          'branches': 40,
          'functions': 40,
          'lines': 40,
          'statements': 40
        }
    },
    setupFilesAfterEnv: ['<rootDir>/enzymeSetup.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer']
};
