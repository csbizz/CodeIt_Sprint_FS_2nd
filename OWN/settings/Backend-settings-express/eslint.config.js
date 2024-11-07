import babelParser from '@babel/eslint-parser';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: { ...globals.node },
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env', '@babel/preset-typescript'],
        },
      },
    },
  },
  {
    plugins: {
      prettier: pluginPrettier,
      import: pluginImport,
    },
  },
  {
    settings: {
      'import/resolver': {
        node: true,
        alias: {
          map: [
            ['@configs', './src/configs'],
            ['@controllers', './src/controllers'],
            ['@models', './src/models'],
            ['@services', './src/services'],
            ['@utils', './src/utils'],
            ['@', './'],
          ],
          extensions: ['.js', '.ts'],
        },
      },
      'import/internal-regex': '@/',
    },
  },
  pluginJs.configs.recommended,
  prettierConfig,
  {
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-restricted-globals': 'off',
      'no-unused-vars': 'off',
      'consistent-return': 'off',
      'import/extensions': ['error', { js: 'never', ts: 'never' }],
      'import/no-duplicates': ['warn', { 'prefer-inline': true, considerQueryString: true }],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'never',
          distinctGroup: false,
          pathGroups: [
            {
              pattern: '@configs/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@controllers/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@models/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@services/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@utils/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          warnOnUnassignedImports: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
        },
      ],
    },
  },
];
