import { useRouter } from 'next/router';
import React from 'react'
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import teacher from '@/pages/apps/class-management/teacher';


type Props = {
    teacherId: number
}

export const TeacherListAction = ({teacherId}: Props) => {

    const router = useRouter();

    const actionItems = [
        {
            key: 1,
            label: <span style={{ fontSize: 14 }}>View</span>,
        },
        {
            key: 2,
            label: <span style={{ fontSize: 14 }}>Edit</span>,
        },
        { key: 3, label: <span style={{ fontSize: 14 }}>Delete</span> },
    ];

    const onMenuClick = ({ item, key }: { item: any; key: string }) => {
        switch (key) {
            case '1':
                router.push(`/apps/class-management/teacher/${teacherId}`);
                break;
            case '2':
                // router.push(`/apps/class-management/class/${classId}/student/${studentId}`);
                
                break;
            case '3':
                break;
            default:
                break;
        }
    }
    return (
        <Dropdown menu={{ items: actionItems, onClick: onMenuClick }} trigger={['hover']}>
            <AppIconButton icon={<MoreOutlined />} />
        </Dropdown>
    )
}

