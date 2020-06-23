import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../views/login';
import Counter from '../views/counter';
import Test from '../views/counter/Text';
import MyLayout from '../views/Layout';
import { useGlobalState } from '../store';
import User from '../views/user';
import Role from '../views/role';

export const Menus = [
  {
    path: '/',
    component: Test,
    exact: true,
    meta: {
      auth: true,
      title: '工作台',
    },
  },
  {
    path: '/counter',
    component: Counter,
    exact: true,
    meta: {
      title: '计算器',
      auth: true,
    },
  },
  {
    path: '/user',
    component: User,
    exact: true,
    meta: {
      auth: true,
      title: '用户管理',
    },
  },
  {
    path: '/role',
    component: Role,
    exact: true,
    meta: {
      auth: false,
      title: '角色管理',
    },
  },
  {
    path: '/theme',
    component: Test,
    meta: {
      auth: false,
      title: '主题管理',
    },
  },
  {
    path: '/topic',
    component: Test,
    meta: {
      auth: false,
      title: '话题管理',
    },
  },
];

export default [
  {
    path: '/login',
    component: Login,
    meta: {
      auth: false,
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
    routes: Menus,
    meta: {
      auth: false,
    },
  },
];

export function RouteWithSubRoutes(route) {
  const [{ token }] = useGlobalState();

  return (
    <Route
      path={route.path}
      render={(props) => {
        // 需要鉴权并且token不存在的情况下跳转登录页
        if (route.meta && route.meta.auth) {
          if (!token) {
            return <Redirect to='/login' />;
          }
        }
        // 登录页存在token的情况下 跳转到首页
        if (token && route.path === '/login') {
          return <Redirect to='/' />;
        }
        return <route.component {...props} routes={route.routes}></route.component>;
      }}
    />
  );
}
