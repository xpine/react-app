import React, { useMemo } from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { SWRConfig } from 'swr';
import request from './service/request';

// import { useGlobalState } from './store';
import routes, { RouteWithSubRoutes } from './route';
import { useGlobalState } from './store';

export default function App() {
  const [{ token }, dispatch] = useGlobalState();
  console.log(token, 111);
  return useMemo(
    () => (
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          fetcher: request.get,
        }}>
        <ConfigProvider componentSize={'small'}>
          <HashRouter>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </HashRouter>
        </ConfigProvider>
      </SWRConfig>
    ),
    [],
  );
}
