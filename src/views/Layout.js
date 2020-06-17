import React from 'react';
import { Layout } from 'antd';
import { RouteWithSubRoutes } from '../route';

const { Header, Footer, Sider, Content } = Layout;

export default function MyLayout(props) {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        {props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
