import AppRowContainer from '@/@crema/components/AppRowContainer'
import TeacherList from '@/@crema/modules/ClassManagement/TeacherList'
import { Button, Col, DatePicker, Form, Input, message, Modal, Select, Space, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledInputSearch, StyledOrderHeader, StyledOrderHeaderInputView, StyledPlusOutlined, StyledTitle } from './index.styled'
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks'
import { addTeacherData, getAllTeacherData } from '@/toolkit/actions/ClassManagement'
import { UploadOutlined } from '@ant-design/icons'
import AppCard from '@/@crema/components/AppCard'
import AppsHeader from '@/@crema/components/AppsContainer/AppsHeader'
import { set } from 'lodash'

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

const TeacherListing = () => {

  const dispatch = useAppDispatch();
  const teacherList = useAppSelector((state) => state.classManagement.teacherList);
  useEffect(() => {
    dispatch(getAllTeacherData())
  }, [dispatch])

  const [newTeacherForm] = Form.useForm();

  const [newTeacherModalVisible, setNewTeacherModalVisible] = useState(false);

  const onNewTeacherValuesChanged = (changedValues: any, allValues: any) => {
    console.log(allValues)
  }

  const onNewTeacherFormSubmit = (values: any) => {
    console.log(values)
    dispatch(addTeacherData(values))
    setNewTeacherModalVisible(false)
    newTeacherForm.resetFields()
    message.success('Teacher added successfully!')
  }

  const searchTeacher = (value: string) => { }

  return (
    <>
      <StyledTitle>Teacher Management</StyledTitle>
      <AppRowContainer>
        <Col xs={24} lg={24}>
          <Button type="primary" icon={<StyledPlusOutlined style={{ marginRight: 5 }} />} onClick={() => { setNewTeacherModalVisible(true) }}>Add new teacher</Button>
        </Col>
        <Col xs={24} lg={24}>
          <AppCard
          title={
            <AppsHeader>
              <StyledOrderHeader>
                <StyledOrderHeaderInputView>
                  <StyledInputSearch
                    id="user-name"
                    placeholder="Search..."
                    type="search"
                    enterButton
                    onChange={event => searchTeacher(event.target.value)}
                  />
                </StyledOrderHeaderInputView>
                {/* <StyledOrderHeaderPagination pageSize={10} count={total} page={page} onChange={onChange} /> */}
              </StyledOrderHeader>
            </AppsHeader>
          }
          >
            <TeacherList data={teacherList || []} loading={false} />
          </AppCard>
        </Col>
      </AppRowContainer>

      {/* Add new teacher modal */}
      <Modal
        title="Add new student"
        open={newTeacherModalVisible}
        onOk={() => setNewTeacherModalVisible(false)}
        onCancel={() => setNewTeacherModalVisible(false)}
        footer={false}
      >
        <Form {...formItemLayout} form={newTeacherForm} onValuesChange={onNewTeacherValuesChanged} onFinish={onNewTeacherFormSubmit}>
          <Form.Item
            label="Teacher name"
            name="name"
            rules={[{ required: true, message: 'Please input teacher name!' }]}>
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Date of birth"
            name="dateOfBirth"
            rules={[{ required: true, message: 'Please select a date of birth!' }]}>
            <DatePicker format={"YYYY-MM-DD"} />
          </Form.Item> */}

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select a gender!' }]}>
            <Select
              defaultValue='Male'
              style={{ width: "100%" }}
              onChange={() => { }}
            >
              <Option value='Male'>Male</Option>
              <Option value='Female'>Female</Option>
            </Select>
          </Form.Item>

          {/* <Form.Item
            label="Email"
            name="teacherEmail"
            rules={[{ required: true, message: 'Please input parent name!' }]}>
            <Input />
          </Form.Item> */}

          <Form.Item
            label="Phone"
            name="contact"
            rules={[{ required: true, message: 'Please input teacher phone!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Avatar"
            name="avatar"
            // rules={[{ required: false, message: 'Please upload an image!' }]}
          >
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
              <Button type='default' onClick={() => setNewTeacherModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TeacherListing
