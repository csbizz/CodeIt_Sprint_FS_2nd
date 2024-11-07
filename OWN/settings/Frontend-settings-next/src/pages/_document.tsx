import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

interface DocumentProps extends DocumentInitialProps {
  emotionStyleTags: JSX.Element[];
}

export async function getInitialProps(ctx: DocumentContext) {
  const originalRenderPage = ctx.renderPage;
  const cache = createCache({ key: 'css' });
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props: any) => <App emotionCache={cache} {...props} />,
    });

  const initialProps = await NextDocument.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style data-emotion={`${style.key} ${style.ids.join(' ')}`} key={style.key} dangerouslySetInnerHTML={{ __html: style.css }} />
  ));

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
}

export default function Document({ emotionStyleTags }: DocumentProps) {
  return (
    <Html lang="ko">
      <Head>{emotionStyleTags}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
