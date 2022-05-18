import React, { useState, createContext } from "react";
import { IntlProvider } from 'react-intl';

import English from '../../../languages/en-US.json';
import Ukrainian from '../../../languages/uk.json';

export const Context = createContext();

const language = localStorage.getItem('language') ?? navigator.language;

let lang;
if(language === 'en-US') {
  lang = English;
} else {
  lang = Ukrainian;
}

export const Wrapper = props => {
  const [locale, setLocale] = useState(language);
  const [messages, setMessages] = useState(lang);

  const selectLang = (e) => {
    const newLocale = e.target.value;
    setLocale(newLocale);
    newLocale === 'en-US' ? setMessages(English) : setMessages(Ukrainian);
  };

  return (
    <Context.Provider value={{locale, selectLang}}>
      <IntlProvider locale={locale} messages={messages}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
}