import { useRouter } from 'next/router';
import React from 'react'
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';


type Props = {
    id: number;
}

export const ItemAction = ({ id }: Props) => {

    const router = useRouter();
    const actionItems = [
        {
            key: 1,
            label: <span style={{ fontSize: 14 }}>View Class</span>,
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
                router.push(`/apps/class-management/class/${id}`);
                break;
            case '2':
                router.push(`/apps/class-management/class/${id}`);
                break;
            case '3':
                break;
            default:
                break;
        }
    }
    return (
        <Dropdown menu={{ items: actionItems, onClick: onMenuClick }} trigger={['click']}>
            <AppIconButton icon={<MoreOutlined />} />
        </Dropdown>
    )
}

