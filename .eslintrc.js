module.exports = {
    extends: [
        'airbnb-typescript',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        "react",
        "jsx-a11y"
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'max-len': ['error', { 'code': 120, 'tabWidth': 2 }],
        'react/prop-types': 'off',
        'dot-notation': 'off',
        'arrow-body-style': 'off',
        'import/order': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/prefer-stateless-function': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-wrap-multilines': [
            'error',
            { 'arrow': true, 'return': true, 'declaration': true },
        ],
        'react/jsx-props-no-spreading': 'off',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        'func-names': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        'react/no-array-index-key': 'warn',
        'no-param-reassign': 'off',
        'react/require-default-props': 'off',
        'consistent-return': 'off',
        'react/no-unused-prop-types': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react/jsx-filename-extension': 'off',
        'react/no-array-index-key': 'error',
        'no-console': 'error'
    },
    env: {
        'es6': true,
    },
};