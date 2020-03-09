import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let initState = {
  currTrackId: '',
  currTrackIndex: 0,
  currTrackTitle: null,
  vidList: []
};

export default function GlobalProvider ({ children }) {
  const [globalState, setGlobalState] = useState(initState);

  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>;
}