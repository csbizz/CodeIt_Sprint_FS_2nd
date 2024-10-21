import ReactDOM from 'react-dom/client';
import App from './components/App.js';
import { LocaleProvider } from './contexts/LocaleContext.js';
import { LOCALE } from './components/LocaleSelect.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LocaleProvider defaultValue={LOCALE.KO}>
    <App />
  </LocaleProvider>
);
