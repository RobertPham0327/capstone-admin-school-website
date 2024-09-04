import AppCard from '@crema/components/AppCard'
import AppRowContainer from '@crema/components/AppRowContainer'
import AppsHeader from '@crema/components/AppsContainer/AppsHeader'
import StudentList from '@crema/modules/ClassManagement/StudentList'
import { Button, Col, Descriptions, Modal, Space, Form, Input, Select, DatePicker, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledAvatar, StyledContainer, StyledPlusOutlined, StyledTeacherInfor, StyledTitle } from '../ClassDetail/index.styled'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks'
import { addStudentData, deleteClassData, getClassStudentList, updateClassData } from '@/toolkit/actions/ClassManagement'
import AppIconButton from '@/@crema/components/AppIconButton'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import dayjs from 'dayjs'


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

const ClassDetail = () => {
  const router = useRouter();
  const { classId } = router.query;
  const [newStudentModalVisible, setNewStudentModalVisible] = useState(false);
  const [updateClassModalVisible, setUpdateClassModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  const { currentStudentList, currentClass } = useAppSelector(({ classManagement }) => classManagement);

  useEffect(() => {
    dispatch(getClassStudentList(Number(classId)));
  }, [dispatch, classId]);

  const startSchoolYearStr = currentClass?.school_year?.split('-')[0];
  const endSchoolYearStr = currentClass?.school_year?.split('-')[1];

  const onUpdateClassValuesChanged = (values: any) => {
    console.log(values);
  }

  const onUpdateClassFormSubmit = (values: any) => {
    console.log(values);
    let classData: any = {};
    if (values.name) {
      classData.name = values.name;
    }
    if (values.classroom) {
      classData.classRoom = values.classroom;
    }
    if (values.startSchoolYear && values.endSchoolYear) {
      classData.schoolYear = `${values.startSchoolYear.format('YYYY')}-${values.endSchoolYear.format('YYYY')}`;
    }
    if (!classData) {
      message.error('Please input class information')
      return;
    }
    dispatch(updateClassData(classId as unknown as number, classData));
    setUpdateClassModalVisible(false);
  }

  const onNewStudentValuesChanged = (values: any) => {
    console.log(values);
  }

  const onNewStudentFormSubmit = (values: any) => {
    console.log(values);
    const studentData = {
      studentName: values.name,
      dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
      gender: values.gender,
      parentName: values.parentName,
      parentPhone: values.parentPhone,
    }
    console.log(studentData);
    dispatch(addStudentData(classId as unknown as number, studentData));
    setNewStudentModalVisible(false);
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this class?',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteClassData(classId as unknown as number));
        message.success('Class deleted successfully');
        router.push('/apps/class-management/');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return (
    <>
      <AppRowContainer>
        <Col xs={24} lg={24}>
          <Space>
            <StyledTitle>Class details</StyledTitle>
            <AppIconButton icon={<AiOutlineEdit />} onClick={() => { setUpdateClassModalVisible(true) }} />
            <AppIconButton icon={<AiOutlineDelete />} onClick={showDeleteConfirm} />
          </Space>
        </Col>
        <Col xs={24} lg={24}>
          <AppCard>
            <StyledContainer>
              <StyledAvatar src="https://www.spencerclarkegroup.co.uk/uploads/5005001.png" />
              <StyledTeacherInfor>
                <h3>{currentClass?.teacher_name || "Unknown"}</h3>
                <p>Class coordinator</p>
              </StyledTeacherInfor>
            </StyledContainer>
          </AppCard>
        </Col>
        <Col xs={24} lg={24}>
          <AppCard title={'Class information'}>
            <Descriptions>
              <Descriptions.Item label='Class name'>{currentClass?.class_name || "Unknown"}</Descriptions.Item>
              <Descriptions.Item label='Classroom'>{currentClass?.class_room || 'Unknown'}</Descriptions.Item>
              <Descriptions.Item label='School year'>{currentClass?.school_year || 'Unknown'}</Descriptions.Item>
            </Descriptions>
          </AppCard>
        </Col>
        <Col xs={24} lg={24}>
          <Space wrap>
            <Button onClick={() => router.push(`/apps/class-management/class-schedule/${classId}`)} type="primary">Class schedule</Button>
            <Button onClick={() => router.push(`/apps/class-management/eating-schedule/${classId}`)} type="primary">Meal schedule</Button>
            <Button ghost type="primary" icon={<StyledPlusOutlined style={{ marginRight: 5 }} />} onClick={() => setNewStudentModalVisible(true)}>Add new student</Button>
          </Space>
        </Col>
        <Col xs={24} lg={24}>
          <AppCard
            title={'Student list'}
          >
            <StudentList data={currentStudentList || []} loading={false} classId={Number(classId)} />
          </AppCard>
        </Col>
      </AppRowContainer>
      {/* Add new student modal */}
      <Modal
        title="Add new student"
        open={newStudentModalVisible}
        onOk={() => setNewStudentModalVisible(false)}
        onCancel={() => setNewStudentModalVisible(false)}
        footer={false}
      >
        <Form {...formItemLayout} onValuesChange={onNewStudentValuesChanged} onFinish={onNewStudentFormSubmit}>
          <Form.Item
            label="Student name"
            name="name"
            rules={[{ required: true, message: 'Please input a student name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Date of birth"
            name="dateOfBirth"
            rules={[{ required: true, message: 'Please select a date of birth!' }]}>
            <DatePicker format={"YYYY-MM-DD"} />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select a gender!' }]}>
            <Select
              placeholder="Select a gender"
              style={{ width: "100%" }}
              onChange={() => { }}
            >
              <Option value='Male'>Male</Option>
              <Option value='Female'>Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Parent name"
            name="parentName"
            rules={[{ required: true, message: 'Please input parent name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Parent phone"
            name="parentPhone"
            rules={[{ required: true, message: 'Please input parent phone!' }]}>
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
              <Button type='default' onClick={() => setNewStudentModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Update class modal */}
      <Modal
        open={updateClassModalVisible}
        onOk={() => setUpdateClassModalVisible(false)}
        onCancel={() => setUpdateClassModalVisible(false)}
        footer={false}
        title={"Update class information"}
      >
        <Form
          {...formItemLayout}
          onValuesChange={onUpdateClassValuesChanged}
          onFinish={onUpdateClassFormSubmit}
          initialValues={{ name: currentClass?.class_name, classroom: currentClass?.class_room, startSchoolYear: dayjs(startSchoolYearStr, 'YYYY'), endSchoolYear: dayjs(endSchoolYearStr, 'YYYY') }}
        >
          <Form.Item
            label="Class name"
            name="name"
          // rules={[{ required: true, message: 'Please input a class name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Class room"
            name="classroom"
          // rules={[{ required: true, message: 'Please input classroom!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Start year'
            name="startSchoolYear">
            <DatePicker picker='year' />
          </Form.Item>

          <Form.Item label='End year' name="endSchoolYear">
            <DatePicker picker='year' />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button type='primary' htmlType='submit'>
                Save
              </Button>
              <Button type='default' onClick={() => setUpdateClassModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ClassDetail
