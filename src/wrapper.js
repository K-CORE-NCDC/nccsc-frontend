import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useDispatch } from 'react-redux';
import Korea from './lang/kr.json';
import English from './lang/en.json';
import { languageChange } from './actions/api_actions';

export const Context = React.createContext('en-US');

// import reportWebVitals from './reportWebVitals';
// const local = 'kr-KO'//navigator.language;
const local = 'en-US';
let lang;
if (local === 'kr-KO') {
  lang = Korea;
} else {
  lang = English;
}

function Wrapper(props) {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);
  const dispatch = useDispatch();

  function selectLanguage(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);

    if (newLocale === 'kr-KO') {
      // dispatch(languageChange("en"));
      dispatch(languageChange('kr-KO'));
      setMessages(Korea);
    } else {
      dispatch(languageChange('en-US'));
      setMessages(English);
    }
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider
        messages={messages}
        locale={locale}
        defaultLocale={locale === 'en-US' ? 'en-US' : locale}
      >
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
}

export default Wrapper;
