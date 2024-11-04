export default {
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 130,
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'auto',

    // import 정렬 설정
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: ['^node:', '<THIRD_PARTY_MODULES>', '^[.]{2}/', '^[.]{1}/', '^[.]{1}/[^.]+$'],
    importOrderSeparation: false, // import 그룹 사이 빈 줄 없음
    importOrderSortSpecifiers: true, // import 구문 내 사양자 정렬
    importOrderParserPlugins: ['typescript', 'jsx'], // 파서 플러그인
    importOrderCaseInsensitive: false, // 대소문자 구분
};
