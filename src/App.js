import React, { useMemo } from 'react';
import { HashRouter, Switch } from 'react-router-dom';

import { useGlobalState } from './store';
import routes, { RouteWithSubRoutes } from './route';

export default function App() {
  const [state] = useGlobalState();
  const token = state.token;
  return useMemo(
    () => (
      <HashRouter>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </HashRouter>
    ),
    [],
  );
}
