import React, { useMemo } from 'react';
import { Layout, Menu, Row, Col, Button, Modal } from 'antd';
import { PoweroffOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { Link, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../route';
import { useGlobalState, actions } from '../store';

const { Header, Content } = Layout;

export default function MyLayout(props) {
  const [{ user }, dispatch] = useGlobalState();
  const handleClick = useMemo(
    () => () => {
      Modal.confirm({
        title: '确认登出？',
        icon: <ExclamationCircleOutlined />,
        okText: '确认',
        cancelText: '取消',
        onOk() {
          dispatch({ type: actions.LOGOUT_SUCCESS });
          props.history.replace('/login');
        },
      });
    },
    [props, dispatch],
  );
  const userMenuIds = (user && user.role && user.role.menus.map((m) => m.id)) || [];
  return useMemo(() => {
    return (
      <Layout style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}>
        <Header>
          <Row align='middle'>
            <Col flex={1}>
              <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[props.location.pathname]}>
                {props.routes.map((route, i) =>
                  route.meta.hidden ||
                  (route.meta.role && userMenuIds.indexOf(route.meta.role) === -1) ? null : (
                    <Menu.Item key={route.path}>
                      <Link to={route.path}>{route.meta.title}</Link>
                    </Menu.Item>
                  ),
                )}
              </Menu>
            </Col>
            <Button
              type='text'
              icon={<PoweroffOutlined style={{ color: '#fff' }} onClick={() => handleClick()} />}
            />
          </Row>
        </Header>
        <Content>
          <div style={{ height: '100%', background: '#fff', overflow: 'auto' }}>
            <Switch>
              {props.routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }, [handleClick, props, userMenuIds]);
}
