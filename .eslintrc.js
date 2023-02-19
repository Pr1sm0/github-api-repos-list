module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-shadow': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
