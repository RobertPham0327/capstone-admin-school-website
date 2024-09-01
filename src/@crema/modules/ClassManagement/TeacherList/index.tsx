import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import { StyledTable } from '../index.styled'
import { ColumnsType } from 'antd/es/table'
import { TeacherListAction } from './TeacherListAction'
import { TeacherDataType } from '@/@crema/types/models/apps/ClassManagement'
import { Typography } from 'antd'
import { ellipsisLines } from '@crema/helpers/StringHelper';


type Props = {
    data: any[],
    loading: boolean
}

const getColumns = (router: NextRouter): ColumnsType<TeacherDataType> => [
    {
        title: 'No.',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
    },
    {
        title: 'Teacher ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (id, record) => (
            <Typography.Link
                onClick={() => router.push(`/apps/class-management/teacher/${record.id}`)}
                style={{ display: 'flex', alignItems: 'center' }}
            >
                {ellipsisLines(`#${record.id}`)}
            </Typography.Link>
        ),
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        align: 'center',
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (id, record) => <TeacherListAction teacherId={record.id} />,
    },
]

const TeacherList = ({ data, loading }: Props) => {
    const router = useRouter()
    return (
        <StyledTable
            hoverColor
            data={data}
            loading={loading}
            columns={getColumns(router)}
            scroll={{ x: 'auto' }} />
    )
}

export default TeacherList
