import { useLocale, useSetLocale } from '../contexts/LocaleContext';

const LOCALE = Object.freeze({
  KO: 'KO',
  EN: 'EN'
});
const LOCALE_MSG = Object.freeze({
  KO: '한국어',
  EN: 'English'
});

function LocaleSelect() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const handleChange = (e) => setLocale(e.target.value);

  return (
    <select value={locale} onChange={handleChange}>
      {Object.entries(LOCALE).map(([key, val]) => (
        <option value={val} key={key}>
          {LOCALE_MSG[val]}
        </option>
      ))}
    </select>
  );
}

export { LOCALE, LocaleSelect };
