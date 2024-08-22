import React, { useEffect, useState } from 'react'
import { StyledAvatar, StyledContainer, StyledStudentInfor, StyledTitle } from './index.styled'
import AppRowContainer from '@crema/components/AppRowContainer'
import { Button, Col, Descriptions, Form, Input, Modal, Select, Space } from 'antd'
import AppCard from '@crema/components/AppCard'
import { ClassStudentDataType } from '@crema/types/models/apps/ClassManagement'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks'
import { getStudentData } from '@/toolkit/actions/ClassManagement'
import AppIconButton from '@/@crema/components/AppIconButton'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const { Option } = Select;

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
    dispatch(getStudentData(classId as unknown as number, studentId as unknown as number));
  }, [studentId]);

  const [updateStudentModalVisible, setUpdateStudentModalVisible] = useState(false);

  return (
    <>
      <Space>
        <StyledTitle>Student Detail</StyledTitle>
        <AppIconButton icon={<AiOutlineEdit />} onClick={() => { setUpdateStudentModalVisible(true) }} />
        <AppIconButton icon={<AiOutlineDelete />} onClick={() => { }} />
      </Space>
      <AppRowContainer>
        <Col xs={24} lg={24}>
          <AppCard title={
            <StyledContainer>
              <StyledAvatar src={currentStudent?.avatarUrl || "https://www.spencerclarkegroup.co.uk/uploads/5005001.png"} />
              <StyledStudentInfor>
                <h3>{currentStudent?.name}</h3>
                <p>Student</p>
              </StyledStudentInfor>
            </StyledContainer>
          }
            style={{ padding: "10px" }}
          >
            <Descriptions title='Student Information'>
              <Descriptions.Item label='Birthday'>{currentStudent?.dateOfBirth}</Descriptions.Item>
              <Descriptions.Item label='Gender'>{currentStudent?.gender}</Descriptions.Item>
              <Descriptions.Item label='Class'>
                {currentStudent?.className}
              </Descriptions.Item>
              <Descriptions.Item label='School'>{currentStudent?.schoolName}</Descriptions.Item>
            </Descriptions>

          </AppCard>
        </Col>
        <Col xs={24} lg={24}>
          <AppCard title='Parent Information' style={{ padding: "10px" }}>
            <Descriptions>
              <Descriptions.Item label='Name'>{currentStudent?.parentName}</Descriptions.Item>
              <Descriptions.Item label='Phone'>
                {currentStudent?.parentPhone}
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
        <Form {...formItemLayout} onValuesChange={(values) => console.log(values)} onFinish={(values) => { console.log(values); setUpdateStudentModalVisible(false) }}>
          <Form.Item
            label="Student name"
            name="name"
            rules={[{ required: true, message: 'Please input a student name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select a gender!' }]}>
            <Select
              defaultValue='male'
              style={{ width: "100%" }}
              onChange={() => { }}>
              <Option value='male'>Male</Option>
              <Option value='female'>Female</Option>
            </Select>
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
