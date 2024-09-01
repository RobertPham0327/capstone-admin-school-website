import React, { useEffect, useState } from 'react'
import { StyledAvatar, StyledContainer, StyledTeacherInfor, StyledTitle } from './index.styled'
import AppRowContainer from '@crema/components/AppRowContainer'
import { Col, Descriptions, Form, Input, Modal, Select, Space, Upload, Button, message } from 'antd'
import AppCard from '@crema/components/AppCard'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks'
import { deleteTeacherData, getTeacherProfileData, updateTeacherData } from '@/toolkit/actions/ClassManagement'
import AppIconButton from '@/@crema/components/AppIconButton'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select;

const confirm = Modal.confirm;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const TeacherDetail = () => {
    const router = useRouter();
    const { teacherId } = router.query;
    console.log(teacherId);

    const dispatch = useAppDispatch();
    const { currentTeacher } = useAppSelector(({ classManagement }) => classManagement);
    useEffect(() => {
        dispatch(getTeacherProfileData(Number(teacherId)));
    }, [dispatch, teacherId]);

    const [updateTeacherModalVisible, setUpdateTeacherModalVisible] = useState(false);

    const onUpdateTeacherValuesChanged = (changedValues: any, allValues: any) => {
    }

    const onUpdateTeacherSubmit = (values: any) => {
        console.log(values)
        dispatch(updateTeacherData(Number(teacherId), values))
        setUpdateTeacherModalVisible(false);
        message.success('Teacher updated successfully');
        router.reload();
    }

    const showDeleteConfirm = () => {
        confirm({
          title: 'Are you sure delete this teacher?',
          content: '',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            dispatch(deleteTeacherData(Number(teacherId)));
            message.success('Teacher deleted successfully');
            router.push('/apps/class-management/teacher');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    return (
        <>
            <Space>
                <StyledTitle>Teacher Detail</StyledTitle>
                <AppIconButton icon={<AiOutlineEdit />} onClick={() => { setUpdateTeacherModalVisible(true) }} />
                <AppIconButton icon={<AiOutlineDelete />} onClick={ () => showDeleteConfirm() } />
            </Space>
            <AppRowContainer>
                <Col xs={24} lg={24}>
                    <AppCard title={
                        <StyledContainer>
                            <StyledAvatar src={currentTeacher?.avatar_url || "https://placeholder.com/150"} />
                            <StyledTeacherInfor>
                                <h3>{currentTeacher?.name}</h3>
                                <p>Class coordinator</p>
                            </StyledTeacherInfor>
                        </StyledContainer>
                    }
                        style={{ padding: "10px" }}
                    >
                        <Descriptions layout='vertical'>
                            <Descriptions.Item label='Biography' span={3}>Unknown</Descriptions.Item>
                            <Descriptions.Item label='Birthday'>Unknown</Descriptions.Item>
                            <Descriptions.Item label='School'>{currentTeacher?.school_name}</Descriptions.Item>
                            <Descriptions.Item label='Contact'>
                                {currentTeacher?.contact}
                            </Descriptions.Item>
                        </Descriptions>
                    </AppCard>
                </Col>
            </AppRowContainer>

            {/* Update teacher modal */}
            <Modal
                title="Update teacher detail"
                open={updateTeacherModalVisible}
                onOk={() => setUpdateTeacherModalVisible(false)}
                onCancel={() => setUpdateTeacherModalVisible(false)}
                footer={false}
                >
                <Form
                    //   initialValues={}
                    {...formItemLayout}
                    onValuesChange={onUpdateTeacherValuesChanged}
                    onFinish={onUpdateTeacherSubmit}
                >
                    <Form.Item
                        label="Teacher name"
                        name="name"
                    // rules={[{ required: true, message: 'Please input a student name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Teacher phone"
                        name="contact">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Avatar"
                        name="avatar">
                        <Upload maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Space>
                            <Button type='primary' htmlType='submit'>
                                Save
                            </Button>
                            <Button type='default' onClick={() => setUpdateTeacherModalVisible(false)}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default TeacherDetail
