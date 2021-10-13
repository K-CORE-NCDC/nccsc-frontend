import React, {useState} from 'react';
import {IntlProvider} from 'react-intl';
import Korea from './lang/kr.json';
import English from './lang/en.json';

export const Context = React.createContext();

// import reportWebVitals from './reportWebVitals';
const local = navigator.language;
let lang;
if (local==="en") {
   lang = English;
} else {
  lang = Korea;
}

const Wrapper = (props) => {
    const [locale, setLocale] = useState(local);

    const [messages, setMessages] = useState(lang);

    function selectLanguage(e) {
        const newLocale = e.target.value;
        setLocale(newLocale);
        if (newLocale === 'en') {
            setMessages(English);
        } else {
            setMessages(Korea);
            
        }
    }
    return (
        <Context.Provider value = {{locale, selectLanguage}}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </Context.Provider>

    );
}


export default Wrapper;