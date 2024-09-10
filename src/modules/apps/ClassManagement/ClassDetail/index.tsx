import AppCard from '@crema/components/AppCard'
import AppRowContainer from '@crema/components/AppRowContainer'
import AppsHeader from '@crema/components/AppsContainer/AppsHeader'
import StudentList from '@crema/modules/ClassManagement/StudentList'
import { Button, Col, Descriptions, Modal, Space, Form, Input, Select, DatePicker, message, Row, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledAvatar, StyledContainer, StyledPlusOutlined, StyledTeacherInfor, StyledTitle } from '../ClassDetail/index.styled'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks'
import { addStudentData, deleteClassData, updateClassData, getClassProfileData } from '@/toolkit/actions/ClassManagement'
import AppIconButton from '@/@crema/components/AppIconButton'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import dayjs from 'dayjs'
import { set } from 'lodash'


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
  const [filteredStudentList, setFilteredStudentList] = useState(null);


  const dispatch = useAppDispatch();

  const { currentClass } = useAppSelector(({ classManagement }) => classManagement);

  useEffect(() => {
    dispatch(getClassProfileData(Number(classId)));
    setFilteredStudentList(currentClass?.student_list);
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
    dispatch(updateClassData(Number(classId), classData));
    setUpdateClassModalVisible(false);
    message.success('Class information updated successfully');
    router.reload();
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
      files: values.avatar,
    }
    console.log(studentData);
    dispatch(addStudentData(Number(classId), studentData));
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
        dispatch(deleteClassData(Number(classId)));
        message.success('Class deleted successfully');
        router.back();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  const [filterForm] = Form.useForm();

  const getFilteredStudent = (studentList: any, filterData: any) => {
    return studentList.filter((item: any) => {
      const studentYearOfBirth = item.date_of_birth.split('-')[0];
      if (filterData.name && !item.name.toLowerCase().includes(filterData.name.toLowerCase())) return false;
      if (filterData.gender && item.gender !== filterData.gender) return false;
      if (filterData.year && studentYearOfBirth !== filterData.year) return false;
      return true
    });
  }

  const onFilterFormChange = (changedValues: any, allValues: any) => {
    const filterData = {
      name: allValues?.name || null,
      gender: allValues?.gender || null,
      year: allValues?.year?.format('YYYY') || null,
    }
    const filteredStudent = getFilteredStudent(currentClass?.student_list, filterData);
    console.log(filteredStudent);
    setFilteredStudentList(filteredStudent);
  }

  const onClearFilter = () => {
    filterForm.setFieldsValue({
      ...filterForm,
      gender: null,
      year: null,
    })
    const filterData = {
      name: filterForm.getFieldValue('name') || null,
    }
    const filteredStudent = getFilteredStudent(currentClass?.student_list, filterData);
    setFilteredStudentList(filteredStudent);
    // setFilteredStudentList(currentClass?.student_list);
    // filterForm.resetFields();
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
              <StyledAvatar src={currentClass?.teacher_avatar} />
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
              <Descriptions.Item label='Classroom'>{currentClass?.location_name || 'Unknown'}</Descriptions.Item>
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
          <AppCard title={"Filter"}>
            <Form onValuesChange={onFilterFormChange} form={filterForm}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Form.Item name='name' noStyle>
                    <Input.Search
                      placeholder='Search by name'
                      onSearch={(value) => { console.log(value) }}
                      enterButton
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6} >
                  <Form.Item name='gender' noStyle>
                    <Select
                      placeholder="Select a gender"
                      style={{ width: "100%" }}
                      onChange={() => { }}>
                      <Option value='Male'>Male</Option>
                      <Option value='Female'>Female</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6} >
                  <Form.Item name='year' noStyle>
                    <DatePicker placeholder='Select a year of birth' picker='year' style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={4} xl={4}>
                  <Button type='primary' onClick={onClearFilter}>Clear filter</Button>
                </Col>

              </Row>
            </Form>
          </AppCard>
        </Col>
        <Col xs={24} lg={24}>
          <AppCard
            title='Student list'
          >
            <StudentList data={filteredStudentList || currentClass?.student_list || []} loading={false} classId={Number(classId)} />
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

          <Form.Item label="Avatar" name='avatar'>
            <Upload maxCount={1}>
              <Button icon={<StyledPlusOutlined />}>Upload student avatar</Button>
            </Upload>

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
          initialValues={{ name: currentClass?.class_name, classroom: currentClass?.location_name, startSchoolYear: dayjs(startSchoolYearStr, 'YYYY'), endSchoolYear: dayjs(endSchoolYearStr, 'YYYY') }}
        >
          <Form.Item
            label="Class name"
            name="name"
          // rules={[{ required: true, message: 'Please input a class name!' }]}
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
