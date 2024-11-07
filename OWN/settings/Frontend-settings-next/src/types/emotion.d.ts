import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      error: string;
      // 필요한 색상 추가
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    // 필요한 테마 속성 추가
  }
}
