import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Login from './views/login/Login';
import { Provider } from 'react-redux';
import { store } from './store';
import Counter from './views/counter/Counter';

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route path='/login' component={Login} />
        <Route path='/counter' component={Counter} />
      </HashRouter>
    </Provider>
  );
}
