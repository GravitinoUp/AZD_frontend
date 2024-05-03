module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', 'react-hooks', 'prettier', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@tanstack/eslint-plugin-query/recommended',
    ],
    rules: {
        'import/no-unresolved': 'off',
        'consistent-return': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'react/prop-types': 0,
        '@tanstack/query/exhaustive-deps': 'error',
        '@tanstack/query/no-rest-destructuring': 'warn',
        '@tanstack/query/stable-query-client': 'error',
    },
    globals: {
        Edit: 'writable',
        console: 'writable',
        _: 'writable',
        $: 'writable',
    },
}
