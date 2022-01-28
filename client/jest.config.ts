export default {
    clearMocks: true,
    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'scss'],
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    modulePaths: ['<rootDir>'],
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    // Runs special logic, adding special
    // extended assertions to Jest
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    testEnvironment: 'jsdom',
};
