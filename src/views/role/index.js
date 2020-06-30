import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, message } from 'antd';
import service from '../../service';
import { useTables } from '../../hooks';

export default function Role(props) {
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState({});

  // 表格
  const { data, pagination, rawData, reload, onChange, setSearchParams } = useTables('/role/page');
  const { isValidating } = rawData;

  const columns = [
    {
      title: '角色',
      dataIndex: 'name',
    },
    {
      title: '操作',
      fixed: 'right',
      render: (text, record) => (
        <Space size='middle'>
          <Button type={'link'} onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Button type={'link'} onClick={() => onConfig(record)}>
            配置
          </Button>
          <Button type={'text'} danger onClick={() => onDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const onDelete = (record) => {
    Modal.confirm({
      title: '删除',
      content: '确认删除该角色？',
      onOk: async () => {
        await service.role.delete(record.id);
        reload();
      },
    });
  };
  const onEdit = (record) => {
    setVisible(true);
    setRow(record);
  };

  const onConfig = (record) => {
    props.history.push(`/role/${record.id}`);
  };
  // 表单
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
    setRow({});
    setVisible(true);
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout={'inline'} style={{ padding: 10 }}>
        <Form.Item name='name' label='角色'>
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
        创建角色
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

      <CreateUserModal
        visible={visible}
        hide={(flag) => {
          setVisible(false);
          flag && reload();
        }}
        data={row}
      />
    </div>
  );
}

export const CreateUserModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const createUser = () => {
    form.validateFields().then((data) => {
      setLoading(true);
      if (props.data.id) {
        service.role
          .update(props.data.id, data)
          .then(() => {
            setLoading(false);
            message.success('编辑成功');
            props.hide && props.hide(true);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        service.role
          .create(data)
          .then(() => {
            setLoading(false);
            message.success('创建成功');
            props.hide && props.hide(true);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    });
  };
  useEffect(() => {
    if (props.visible && props.data && props.data.id) {
      form.setFieldsValue({
        ...props.data,
        roleId: props.data.role && props.data.role.id.toString(),
      });
    }
  }, [props.visible, props.data, form]);
  return (
    <Modal
      title='创建角色'
      confirmLoading={loading}
      visible={props.visible}
      onOk={createUser}
      onCancel={() => {
        form.resetFields();
        props.hide && props.hide();
      }}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
        <Form.Item
          name='name'
          label='角色名'
          rules={[
            {
              required: true,
              message: '角色名不能为空',
            },
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
