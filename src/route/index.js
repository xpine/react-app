import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

import Login from '../views/login';

import ProjectList from '../views/project';
import MyLayout from '../views/Layout';
import { useGlobalState, actions } from '../store';
import User from '../views/user';
import Role from '../views/role';
import RoleMenu from '../views/role/Menu';
import NotFound from '../views/404';
import service from '../service';
import Project from '../views/project/Project';
import OSS from '../views/OSS';

export const Menus = [
  {
    path: '/',
    component: ProjectList,
    exact: true,
    meta: {
      auth: true,
      title: '工作台',
      role: 1,
    },
  },
  {
    path: '/project/OSS',
    component: OSS,
    exact: true,
    meta: {
      auth: true,
      role: 1,
      hidden: true,
      title: 'OSS',
    },
  },
  {
    path: '/project/:id/edit',
    component: Project,
    exact: true,
    meta: {
      auth: true,
      title: '项目配置',
      role: 1,
      hidden: true,
    },
  },
  {
    path: '/user',
    component: User,
    exact: true,
    meta: {
      auth: true,
      title: '用户管理',
      role: 2,
    },
  },
  {
    path: '/role',
    component: Role,
    exact: true,
    meta: {
      auth: true,
      title: '角色管理',
      role: 3,
    },
  },
  {
    path: '/role/:id',
    component: RoleMenu,
    exact: true,
    meta: {
      auth: true,
      title: '角色配置',
      hidden: true,
      role: 58,
    },
  },
  {
    path: '/404',
    component: NotFound,
    meta: {
      auth: false,
      hidden: true,
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
    path: '/',
    component: MyLayout,
    routes: Menus,
    meta: {
      auth: false,
    },
  },
];

export function RouteWithSubRoutes(route) {
  const [{ token, user }, dispatch] = useGlobalState();
  const [loading, setLoading] = useState(token && !user);
  useEffect(() => {
    if (token && !user) {
      service.user.getCurrent().then((res) => {
        dispatch({
          type: actions.LOGIN_SUCCESS,
          payload: {
            token,
            user: res,
          },
        });
        setLoading(false);
      });
    }
  }, [token, user, dispatch]);
  return (
    <div>
      {loading ? (
        <div style={{ padding: 100, textAlign: 'center' }}>
          <Spin />
        </div>
      ) : (
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
            // 判断用户权限是否存在
            if (route.meta && route.meta.role) {
              const userMenuIds = (user && user.role && user.role.menus.map((m) => m.id)) || [];
              if (userMenuIds.indexOf(route.meta.role) === -1) {
                return <Redirect to='/404' />;
              }
            }
            return <route.component {...props} routes={route.routes}></route.component>;
          }}
        />
      )}
    </div>
  );
}
