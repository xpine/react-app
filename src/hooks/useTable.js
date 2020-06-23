import React, { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';

// 封装了 分页器的简单逻辑，提供了表格的刷新重置功能

export const useTables = (key) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams, setSearchParams] = useState({});
  const params = useMemo(
    () => ({
      params: {
        page,
        pageSize,
        ...searchParams,
      },
    }),
    [page, pageSize, searchParams],
  );
  const rawData = useSWR([key, params]);
  const { data, total } = rawData.data || {};
  // 页码改变监听事件
  const onChange = ({ total, current, pageSize }) => {
    setPage(current - 1);
    setPageSize(pageSize);
  };
  return {
    rawData,
    data,
    pagination: {
      current: page + 1,
      pageSize,
      total,
      showTitle: true,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
    reload() {
      setPage(0);
      rawData.mutate();
    },
    refresh() {
      rawData.mutate();
    },
    onChange,
    setSearchParams,
    setPage,
    setPageSize,
  };
};
