import React, { useMemo, useState, useEffect } from 'react';
import { Table } from 'antd';
import reqeust from '../../service/request';
import useSWR from 'swr';
export default function User() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const params = useMemo(
    () => ({
      params: {
        page,
        pageSize,
      },
    }),
    [page, pageSize],
  );
  const { data, isValidating } = useSWR(['/user/page', params], reqeust.get);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'username',
    },
  ];

  return <Table columns={columns} rowKey={'id'} dataSource={data} loading={isValidating} />;
}
