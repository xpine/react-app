import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../views/login';
import Counter from '../views/counter';
import Test from '../views/counter/Text';
import MyLayout from '../views/Layout';

export default [
  {
    path: '/login',
    component: Login,
    meta: {
      auth: true,
    },
  },
  {
    path: '/test',
    component: Test,
    meta: {
      auth: false,
    },
  },
  {
    path: '/',
    component: MyLayout,
    routes: [
      {
        path: '/counter',
        component: Counter,
        meta: {
          auth: true,
        },
      },
    ],
    meta: {
      auth: false,
    },
  },
];

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}></route.component>
      )}
    />
  );
}
