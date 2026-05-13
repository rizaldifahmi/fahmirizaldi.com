const nextVitals = require('eslint-config-next/core-web-vitals');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
  {
    ignores: [
      '.next/**',
      '.velite/**',
      'build/**',
      'coverage/**',
      'dist/**',
      'node_modules/**',
      'out/**',
      'public/**',
      'next-env.d.ts',
      'components/animate-ui/**',
    ],
  },
  ...nextVitals,
  prettierRecommended,
  {
    rules: {
      'prettier/prettier': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'prettier/prettier': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
      'import/prefer-default-export': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['function-declaration', 'arrow-function'],
          unnamedComponents: 'arrow-function',
        },
      ],
      'jsx-quotes': ['error', 'prefer-double'],
      'react/display-name': 'off',
      'no-nested-ternary': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
];
