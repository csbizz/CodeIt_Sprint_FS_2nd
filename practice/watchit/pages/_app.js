import Header from '@/components/Header.js';
import { ThemeProvider } from '@/lib/ThemeContext.js';
import '@/styles/globals.css';
import Head from 'next/head.js';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>watchit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
