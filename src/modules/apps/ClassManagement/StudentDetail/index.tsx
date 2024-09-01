import React, { useEffect, useState } from 'react'
import { StyledAvatar, StyledContainer, StyledStudentInfor, StyledTitle } from './index.styled'
import AppRowContainer from '@crema/components/AppRowContainer'
import { Button, Col, Descriptions, Form, Input, message, Modal, Select, Space, Upload } from 'antd'
import AppCard from '@crema/components/AppCard'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks'
import { deleteStudentData, getStudentData, updateStudentData } from '@/toolkit/actions/ClassManagement'
import AppIconButton from '@/@crema/components/AppIconButton'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
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

const StudentDetail = () => {
  const router = useRouter();
  const { classId, studentId } = router.query;
  console.log('classId', classId);
  console.log('studentId', studentId);
  const dispatch = useAppDispatch();
  const { currentStudent } = useAppSelector(({ classManagement }) => classManagement);

  useEffect(() => {
    dispatch(getStudentData(studentId as unknown as number, classId as unknown as number));
  }, [studentId]);

  const [updateStudentModalVisible, setUpdateStudentModalVisible] = useState(false);

  const onUpdateStudentValuesChanged = (values: any) => {
    console.log(values);
  }

  const isValidUpdateStudentForm = (values: any) => {
    if (!values.studentName || !values.parentName || !values.parentPhone) {
      return false;
    }
    return true;
  }

  const onUpdateStudentSubmit = (values: any) => {
    console.log(values);

    if (!isValidUpdateStudentForm(values)) {
      return
    }
    dispatch(updateStudentData(Number(studentId), Number(classId), values));
    setUpdateStudentModalVisible(false);
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this student?',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteStudentData(Number(studentId)));
        message.success('Student deleted successfully');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return (
    <>
      <Space>
        <StyledTitle>Student Detail</StyledTitle>
        <AppIconButton icon={<AiOutlineEdit />} onClick={() => { setUpdateStudentModalVisible(true) }} />
        <AppIconButton icon={<AiOutlineDelete />} onClick={showDeleteConfirm} />
      </Space>
      <AppRowContainer>
        <Col xs={24} lg={24}>
          <AppCard title={
            <StyledContainer>
              <StyledAvatar src={currentStudent?.avatar_url || "https://www.spencerclarkegroup.co.uk/uploads/5005001.png"} />
              <StyledStudentInfor>
                <h3>{currentStudent?.student_name}</h3>
                <p>Student</p>
              </StyledStudentInfor>
            </StyledContainer>
          }
            style={{ padding: "10px" }}
          >
            <Descriptions title='Student Information'>
              <Descriptions.Item label='Birthday'>{currentStudent?.date_of_birth || 'Unknown'}</Descriptions.Item>
              <Descriptions.Item label='Gender'>{currentStudent?.gender || 'Unknown'}</Descriptions.Item>
              <Descriptions.Item label='Class'>
                {currentStudent?.class_name || 'Unknown'}
              </Descriptions.Item>
              <Descriptions.Item label='School'>{currentStudent?.school_name || 'Unknown'}</Descriptions.Item>
            </Descriptions>

          </AppCard>
        </Col>
        <Col xs={24} lg={24}>
          <AppCard title='Parent Information' style={{ padding: "10px" }}>
            <Descriptions>
              <Descriptions.Item label='Name'>{currentStudent?.parent_name || 'Unknown'}</Descriptions.Item>
              <Descriptions.Item label='Phone'>
                {currentStudent?.parent_phone || 'Unknown'}
              </Descriptions.Item>
            </Descriptions>
            {/* <Descriptions title='Parent 1'>
                            <Descriptions.Item label='Name'>Nguyen Thi Bich</Descriptions.Item>
                            <Descriptions.Item label='Role'>Mother</Descriptions.Item>
                            <Descriptions.Item label='Phone'>
                                0123456789
                            </Descriptions.Item>
                            <Descriptions.Item label='Email'>bichnguyen@gmail.com</Descriptions.Item>
                        </Descriptions> */}
          </AppCard>
        </Col>
        {/* <Col xs={24} lg={24}>
          <AppCard title='Medical status' style={{ padding: "10px" }}>
            <Descriptions>
              <Descriptions.Item label='Blood type'>A</Descriptions.Item>
              <Descriptions.Item label='Allergy'>None</Descriptions.Item>
              <Descriptions.Item label='Disease'>
                None
              </Descriptions.Item>
              <Descriptions.Item label='Medical history'>None</Descriptions.Item>
            </Descriptions>
          </AppCard>
        </Col>
        <Col xs={24} lg={24}>
          <AppCard title='Absence status' style={{ padding: "10px" }}>
            <Descriptions>
              <Descriptions.Item label='Total absence'>5</Descriptions.Item>
              <Descriptions.Item label='Absence rate'>10%</Descriptions.Item>
              <Descriptions.Item label='Last absence date'>
                20/10/2021
              </Descriptions.Item>
            </Descriptions>
          </AppCard>
        </Col> */}
      </AppRowContainer>

      <Modal
        title='Update student information'
        open={updateStudentModalVisible}
        onOk={() => { setUpdateStudentModalVisible(false) }}
        onCancel={() => { setUpdateStudentModalVisible(false) }}
        footer={false}
      >
        <Form
          initialValues={
            {
              studentName: currentStudent?.student_name,
              parentName: currentStudent?.parent_name,
              parentPhone: currentStudent?.parent_phone
            }
          }
          {...formItemLayout}
          onValuesChange={onUpdateStudentValuesChanged}
          onFinish={onUpdateStudentSubmit}
        >
          <Form.Item
            label="Student name"
            name="studentName"
          // rules={[{ required: true, message: 'Please input a student name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Parent name"
            name="parentName"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Parent phone"
            name="parentPhone">
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
              <Button type='default' onClick={() => setUpdateStudentModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default StudentDetail
