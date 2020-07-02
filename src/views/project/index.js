import React from 'react';
import useSWR from 'swr';
import { Card, Row, Col, Button } from 'antd';
export default function ProjectList(props) {
  const { data: projectList = [], isValidating } = useSWR('/project/all');

  return (
    <Row style={{ padding: 10 }} gutter={10}>
      {projectList.map((project) => (
        <Col key={project.id} span={8}>
          <Card
            title={project.name}
            extra={
              <Button onClick={() => props.history.push(`/project/${project.id}`)}>配置</Button>
            }>
            <p>{project.desc}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
