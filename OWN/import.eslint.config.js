import babelParser from '@babel/eslint-parser';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2023, // ECMAScript 버전 설정
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // JSX 구문 활성화
        },
      },
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: true,
      },
    },
  },
  pluginJs.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: pluginPrettier,
      'jsx-a11y': pluginJsxA11y,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
    },
  },
  {
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-restricted-globals': 'off',
      'no-lone-blocks': 'off',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off', // Next.js에서는 필요 없음
      'react/jsx-uses-react': 'off', // React 17+에서는 필요 없음
      'no-bitwise': 'off',
      'react/prop-types': 'off',
      'consistent-return': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/label-has-associated-control': ['error', { some: ['nesting', 'id'] }],
      'guard-for-in': 'off',
      'no-underscore-dangle': 'off',
      camelcase: 'off',
      // NOTE JS/TS 관련 확장자만 생략한다.
      'import/extensions': ['error', 'always', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never',
          pathGroups: [
            // 함수/컴포넌트 파일 (확장자가 없거나 js, jsx, ts, tsx인 경우)
            { pattern: '**/*.?(js|jsx|ts|tsx)', group: 'sibling', position: 'before' },
            // 이미지 파일
            { pattern: '**/*.?(png|jpg|jpeg|gif|svg|webp)', group: 'sibling', position: 'after' },
            // CSS 파일
            { pattern: '**/*.?(css|scss|sass|less)', group: 'sibling', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external', 'parent', 'index'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
        },
      ],
      'import/no-duplicates': ['warn', { 'prefer-inline': true, considerQueryString: true }],
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/export': 'error',
    },
  },
];
