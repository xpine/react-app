import React, { useMemo } from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { SWRConfig } from 'swr';
import request from './service/request';

import routes, { RouteWithSubRoutes } from './route';

export default function App() {
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
