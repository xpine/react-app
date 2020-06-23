import React, { useRef, forwardRef, useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, Select } from 'antd';
import service from '../../service';
import { useTables } from '../../hooks';
import useSWR from 'swr';
export default function User() {
  const [visible, setVisible] = useState(false);
  const { data, pagination, rawData, reload, onChange, setSearchParams } = useTables('/user/page');
  const { isValidating } = rawData;

  const onDelete = (record) => {
    Modal.confirm({
      title: '删除',
      content: '确认删除该用户？',
      onOk: async () => {
        await service.user.delete(record.id);
        reload();
      },
    });
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'username',
    },
    {
      title: '操作',
      fixed: 'right',
      render: (text, record) => (
        <Space size='middle'>
          <Button type={'text'} danger onClick={() => onDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const [form] = Form.useForm();
  const onFinish = (values) => {
    setSearchParams(values);
    reload();
  };

  const onReset = () => {
    form.resetFields();
    setSearchParams({});
    reload();
  };
  const onCreate = () => {
    setVisible(true);
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout={'inline'} style={{ padding: 10 }}>
        <Form.Item name='username' label='用户名'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button htmlType='button' onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      <Button type='primary' onClick={onCreate}>
        创建用户
      </Button>
      <Table
        columns={columns}
        rowKey={'id'}
        dataSource={data}
        loading={isValidating}
        pagination={pagination}
        scroll={{
          x: '100vw',
        }}
        onChange={onChange}
      />

      <CreateUserModal visible={visible} onCancel={() => setVisible(false)} />
    </div>
  );
}
export const CreateUserModal = (props) => {
  const [query, setQuery] = useState('');
  const [form] = Form.useForm();
  const createUser = () => {
    form.validateFields().then((resp) => {
      console.log(resp, 21);
    });
  };
  const { data: res = {} } = useSWR(`/role/page?page=0&pageSize=20&name=${query}`);
  const handleSearch = (query) => {
    setQuery(query);
  };
  const { data: roles = [] } = res;
  const options = roles.map((d) => <Select.Option key={d.id}>{d.name}</Select.Option>);
  return (
    <Modal title='创建用户' visible={props.visible} onOk={createUser} onCancel={props.onCancel}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
        <Form.Item
          name='username'
          label='用户名'
          rules={[
            {
              required: true,
              message: '用户名不能为空',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码'
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
          ]}>
          <Input type={'password'} />
        </Form.Item>
        <Form.Item name='roleId' label='角色类型'>
          <Select
            showSearch
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            notFoundContent={null}>
            {options}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
