export default {
    clearMocks: true,
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    roots: ['<rootDir>/app'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
