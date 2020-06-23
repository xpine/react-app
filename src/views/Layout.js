import React, { useMemo } from 'react';
import { Layout, Menu, Row, Col, Button, Modal } from 'antd';
import { PoweroffOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { Link, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../route';
import { useGlobalState, actions } from '../store';

const { Header, Content } = Layout;

export default function MyLayout(props) {
  const [, dispatch] = useGlobalState();
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

  return useMemo(() => {
    console.log('layout');
    return (
      <Layout style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}>
        <Header>
          <Row align='middle'>
            <div className='logo' />
            <Col flex={1}>
              <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[props.location.pathname]}>
                {props.routes.map((route, i) => (
                  <Menu.Item key={route.path}>
                    <Link to={route.path}>{route.meta.title}</Link>
                  </Menu.Item>
                ))}
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
  }, [handleClick, props]);
}
