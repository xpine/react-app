import React from 'react';
import { Upload, message, Table, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import service from '../../service';
import utils from '../../utils';
import { useTables } from '../../hooks';

const { Dragger } = Upload;

export default function OSS() {
  // 表格
  const { data, pagination, rawData, reload, onChange } = useTables('/file/page');
  const { isValidating } = rawData;

  const props = {
    name: 'file',
    multiple: true,
    action: service.uploadUrl,
    showUploadList: false,
    headers: {
      Authorization: `Bearer ${utils.token.get()}`,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        reload();
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'username',
      render: (text, record, index) => index + 1,
    },
    {
      title: '文件名',
      dataIndex: 'name',
    },
    {
      title: '预览',
      dataIndex: 'url',
      render: (text, record) => <img alt={record.name} src={text} width='100px' />,
    },
    {
      title: '文件大小（byte）',
      dataIndex: 'size',
    },
    {
      title: '操作',
      fixed: 'right',
      render: (text, record, index) => (
        <CopyToClipboard text={record.url} onCopy={() => message.success('复制成功')}>
          <Button type='link'>复制</Button>
        </CopyToClipboard>
      ),
    },
  ];
  return (
    <div>
      <Dragger {...props}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
        <p className='ant-upload-hint'>
          Support for a single or bulk upload. Strictly prohibit from uploading company data or
          other band files
        </p>
      </Dragger>
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
