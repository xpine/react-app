import React from 'react';
import useSWR from 'swr';
import { Card, Row, Col } from 'antd';
import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useGlobalState } from '../../store';

const { Meta } = Card;

export default function ProjectList(props) {
  const { data: projectList = [] } = useSWR('/project/all');
  const [{ user }] = useGlobalState();
  return (
    <Row style={{ padding: 10 }} gutter={10}>
      {projectList.map((project) => (
        <Col key={project.id} span={8}>
          <Card
            cover={
              <img
                alt='example'
                src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
              />
            }
            actions={
              user.id === project.id
                ? [
                    <SettingOutlined
                      key='setting'
                      onClick={() => props.history.push(`/project/${project.id}/edit`)}
                    />,
                    <EllipsisOutlined
                      key='ellipsis'
                      onClick={() => props.history.push(`/project/OSS`)}
                    />,
                  ]
                : [
                    <EllipsisOutlined
                      key='ellipsis'
                      onClick={() => props.history.push(`/project/OSS`)}
                    />,
                  ]
            }>
            <Meta title={project.name} description={project.desc} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
