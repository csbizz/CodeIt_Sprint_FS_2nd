import { createContext, useContext, useState } from 'react';
import { LOCALE } from '../components/LocaleSelect';

const LocaleContext = createContext();

function LocaleProvider({ defaultLocale = LOCALE.KO, children }) {
  const [locale, setLocale] = useState(defaultLocale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error(`Don't use useLocale() out of LocaleProvider`);

  return context.locale;
}

function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context)
    throw new Error(`Don't use useSetLocale() out of LocaleProvider`);

  return context.setLocale;
}

export { LocaleProvider, useLocale, useSetLocale };
