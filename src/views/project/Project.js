import React, { useState } from 'react';
import useSWR from 'swr';
import { Form, Input, Spin, Select, Button } from 'antd';
import service from '../../service';
const { Option } = Select;

export default function Project(props) {
  const [query, setQuery] = useState('');
  const { data: project = {}, isValidating } = useSWR(`/project/${props.match.params.id}`);
  const { data: userList = [] } = useSWR(`/user/all?username=${query}`);

  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    service.project.update(props.match.params.id, values);
  };
  const handleSearch = (query) => {
    setQuery(query);
  };
  project.memberIds = (project.members && project.members.map((item) => item.id)) || [];

  const options = userList.map((user) => (
    <Option key={user.id} value={user.id} disabled={user.id === project.createdBy.id}>
      {user.username}
    </Option>
  ));
  return (
    <div>
      {isValidating ? (
        <Spin />
      ) : (
        <Form
          {...formItemLayout}
          from={form}
          name='project'
          onFinish={onFinish}
          initialValues={project}
          style={{ width: 680, margin: '0 auto', paddingTop: 80 }}>
          <Form.Item
            label='项目名'
            name='name'
            rules={[
              {
                required: true,
                message: '项目名不能为空',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='项目描述'
            name='desc'
            rules={[
              {
                required: true,
                message: '项目描述不能为空',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='创建者'
            name={['createdBy', 'username']}
            rules={[
              {
                required: true,
                message: '创建者不能为空',
              },
            ]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label='项目成员' name='memberIds'>
            <Select
              mode='multiple'
              showSearch
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={handleSearch}
              notFoundContent={null}>
              {isValidating ? null : options}
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
