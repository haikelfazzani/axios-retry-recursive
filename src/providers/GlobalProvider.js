import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let initState = {
  controls: {
    volume: 50,
    isMuted: false,
    currentVidPlay: 0
  },
  vidList: [],
  vidInfos: { vidId: '', vidTitle: null }
};

export default function GlobalProvider ({ children }) {
  const [globalState, setGlobalState] = useState(initState);

  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>;
}