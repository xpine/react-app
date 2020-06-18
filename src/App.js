import React, { useMemo } from 'react';
import { HashRouter, Switch } from 'react-router-dom';

// import { useGlobalState } from './store';
import routes, { RouteWithSubRoutes } from './route';
import { SWRConfig } from 'swr';

export default function App() {
  return useMemo(
    () => (
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}>
        <HashRouter>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </HashRouter>
      </SWRConfig>
    ),
    [],
  );
}
