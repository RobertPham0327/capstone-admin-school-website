import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import { StyledTable } from '../index.styled'
import { ColumnsType } from 'antd/es/table'
import { ClassStudentDataType } from '@crema/types/models/apps/ClassManagement'
import { StudentListAction } from './StudentListAction'

type StudentListProps = {
    classId: number,
    data: ClassStudentDataType[],
    loading: boolean
}

const getColumns = (router: NextRouter, classId: number): ColumnsType<ClassStudentDataType> => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
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
        title: 'Birthday',
        dataIndex: 'date_of_birth',
        key: 'date_of_birth',
        align: 'center',
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (id, record) => <StudentListAction classId={classId} studentId={record.id}/>,
    },
]

const StudentList = ({ data, loading, classId }: StudentListProps) => {
    const router = useRouter()
    return (
        <StyledTable
            hoverColor
            data={data}
            loading={loading}
            columns={getColumns(router, classId)}
            scroll={{ x: 'auto' }} />
    )
}

export default StudentList
