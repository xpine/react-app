import React, { createContext, useReducer, useContext } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ reducer, initialState, children }) => (
  <GlobalContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GlobalContext.Provider>
);

const useGlobalState = () => useContext(GlobalContext);

export { GlobalContext, GlobalProvider, useGlobalState };
export * from './reducer';
export * from './actions';
