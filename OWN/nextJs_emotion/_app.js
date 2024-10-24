// import GlobalContextProvider from '@/src/components/GlobalContextProvider';
// import '@/styles/import.css';

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <GlobalContextProvider>
//         <Component {...pageProps} />
//       </GlobalContextProvider>
//     </>
//   );
// }

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import GlobalContextProvider from '@/src/components/GlobalContextProvider';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import '@/styles/import.css';

const clientSideEmotionCache = createCache({ key: 'css' });

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <>
      <CacheProvider value={emotionCache}>
        <GlobalContextProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </GlobalContextProvider>
      </CacheProvider>
    </>
  );
}
