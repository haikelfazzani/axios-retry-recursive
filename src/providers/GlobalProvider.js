import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let initState = {
  userCode: '',
  language: 'javascript',
  fileExtension: '.js'
};

export default function GlobalProvider ({ children }) {
  const [globalState, setGlobalState] = useState(initState);
  
  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>;
}