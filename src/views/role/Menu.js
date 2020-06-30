import React, { useRef } from 'react';
import useSWR from 'swr';
import { Tree, Form, Button, message } from 'antd';
import service from '../../service';
export default function Menu(props) {
  const { data: role, mutate } = useSWR(`/role/${props.match.params.id}`);
  const { data: rawData = [], isValidating } = useSWR('/menu/getMenuTree');
  const treeRef = useRef();
  const translator = (data) => {
    return data.map((d) => ({
      key: d.id,
      title: d.name,
      children: translator(d.children || []),
    }));
  };
  const defaultCheckedKeys = role && role.menus && role.menus.map((m) => m.id);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    service.role
      .update(props.match.params.id, {
        ...role,
        menuIds: treeRef.current.state.checkedKeys,
      })
      .then(() => {
        message.success('修改成功');
        mutate();
      });
  };
  return (
    <Form form={form} onFinish={onFinish} style={{ padding: 10 }}>
      {!isValidating ? (
        <Form.Item>
          <Tree
            ref={treeRef}
            checkable
            treeData={translator(rawData)}
            defaultCheckedKeys={defaultCheckedKeys}></Tree>
        </Form.Item>
      ) : null}
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          确定
        </Button>
      </Form.Item>
    </Form>
  );
}
