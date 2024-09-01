import React from 'react';
import { Typography } from 'antd';
import { StyledListingStatus, StyledTable } from '../index.styled';
import { ellipsisLines } from '@crema/helpers/StringHelper';
import { NextRouter, useRouter } from 'next/router';
import type { ColumnsType } from 'antd/es/table';
import { ItemAction } from './ItemAction';
import { ClassDataType } from '@crema/types/models/apps/ClassManagement';

const getColumns = (router: NextRouter): ColumnsType<any> => [
  {
    title: 'No.',
    dataIndex: 'index',
    align: 'center',
    key: 'index',
  },
  {
    title: 'Class ID',
    dataIndex: 'id',
    align: 'center',
    key: 'id',
    render: (id, record) => (
      <Typography.Link
        onClick={() => router.push(`/apps/class-management/class/${record.id}`)}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {ellipsisLines(`#${record.id}`)}
      </Typography.Link>
    ),
  },
  {
    title: 'Class name',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: 'Teacher',
    dataIndex: 'teacher_name',
    align: 'center',
    key: 'teacher_name',
    render: (id, record) => (
      <Typography.Link
        onClick={() => router.push(`/apps/class-management/class/${record.id}/teacher/${record.teacher_id}`)}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {ellipsisLines(record?.teacher_name)}
      </Typography.Link>
    ),
  },
  {
    title: 'Classroom',
    dataIndex: 'class_room',
    align: 'center',
    key: 'class_room',
  },
  {
    title: 'School year',
    dataIndex: 'school_year',
    align: 'center',
    key: 'school_year',
  },
  // {
  //   title: 'Created Date',
  //   dataIndex: 'created_at',
  //   align: 'center',
  //   key: 'created_at',
  // },
  {
    title: 'Actions',
    dataIndex: 'actions',
    align: 'center',
    key: 'actions',
    render: (id, record) => <ItemAction id={record.id} />,
  },
];

type ClassListProps = {
  data: ClassDataType[];
  loading: boolean;
};

const ClassList = ({ data, loading }: ClassListProps) => {
  const router = useRouter();
  return (
    <StyledTable
      hoverColor
      data={data}
      loading={loading}
      columns={getColumns(router)}
      scroll={{ x: 'auto' }}
    />
  );
};

export default ClassList;
