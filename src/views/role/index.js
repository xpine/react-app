import React from 'react';
import { Table, Space, Button, Modal, Form, Input } from 'antd';
import service from '../../service';
import { useTables } from '../../hooks';
export default function User() {
  const { data, pagination, rawData, reload, onChange, setSearchParams } = useTables('/role/page');
  const { isValidating } = rawData;

  const onDelete = (record) => {
    Modal.warning({
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
      title: '角色名',
      dataIndex: 'name',
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
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout={'inline'} style={{ padding: 10 }}>
        <Form.Item name='name' label='角色名'>
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
    </div>
  );
}
