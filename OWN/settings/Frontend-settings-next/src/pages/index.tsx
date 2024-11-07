/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div css={containerStyle}>
      <Head>
        <title>Next.js with TypeScript</title>
        <meta name="description" content="Next.js with TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainStyle}>
        <h1 css={titleStyle}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
};

const containerStyle = css`
  padding: 0 2rem;
`;

const mainStyle = css`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const titleStyle = css`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;

  a {
    color: #0070f3;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`;

export default Home;
