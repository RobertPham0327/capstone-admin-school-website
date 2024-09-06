import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import React, { use, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { FilterItem, ClassList } from '@crema/modules/ClassManagement';
import AppRowContainer from '@crema/components/AppRowContainer';
import AppCard from '@crema/components/AppCard';
import { Col, Space, Modal, DatePicker, Row } from 'antd';
import {
  StyledInputSearch,
  StyledOrderFooterPagination,
  StyledOrderHeader,
  StyledOrderHeaderInputView,
  StyledOrderHeaderPagination,
  StyledTitle,
  StyledPlusOutlined,
  StyledTitle5,
} from './index.styled';
import { useAppSelector, useAppDispatch } from '@toolkit/hooks';
import { Button, Form, Input, Select } from "antd";
import { createClassData, getAllLocationData, getAllTeacherData, getClassList } from '@/toolkit/actions/ClassManagement';
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


const ClassListing = () => {
  const { messages } = useIntl();

  const dispatch = useAppDispatch();

  const [filterData, setFilterData] = useState({
    title: '',
    inStock: [true, false],
    mrp: { start: 0, end: 30000 },
  });

  const [page, setPage] = useState(0);

  const onChange = (page: number) => {
    setPage(page);
  };

  const searchClass = (title: string) => {
    setFilterData({ ...filterData, title });
  };

  const [newClassModalVisible, setNewClassModalVisible] = useState(false);

  const { classList, teacherList, locationList } = useAppSelector(({ classManagement }) => classManagement);

  const loading = useAppSelector(({ common }) => common.loading);

  const [filteredClassList, setFilteredClassList] = useState(classList);
  

  useEffect(() => {
    dispatch(getClassList());
    dispatch(getAllTeacherData());
    dispatch(getAllLocationData());
    setFilteredClassList(classList);
  }, [dispatch]);

  const onFormSubmit = (values: any) => {
    console.log(values);
    const classData = {
      name: values.name,
      teacherId: Number(values.teacherId),
      classRoom: values.classroom,
      schoolYear: values.startSchoolYear.format('YYYY') + '-' + values.endSchoolYear.format('YYYY'),
    }
    dispatch(createClassData(classData));
    setNewClassModalVisible(false);
  }

  const onFormValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues);
  }

  const filterClass = (classList: any, filterData: any) => {
    return classList.filter((item: any) => {
      const itemStartYear = item.school_year.split('-')[0];
      const itemEndYear = item.school_year.split('-')[1];
      if (filterData.teacher && item.teacher_id !== filterData.teacher) return false;
      if (filterData.class && item.id !== filterData.class) return false;
      if (filterData.startYear && itemStartYear !== filterData.startYear) return false;
      if (filterData.endYear && itemEndYear !== filterData.endYear) return false;
      return true;
    });
  }

  const [filterForm] = Form.useForm();

  const onFilterFormChange = (changedValues: any, allValues: any) => {
    const filterData = {
      teacher: allValues?.teacher || null,
      class: allValues?.class || null,
      startYear: allValues?.startYear?.format('YYYY') || null,
      endYear: allValues?.endYear?.format('YYYY') || null,
    }
    const filteredClass = filterClass(classList, filterData);
    console.log(filteredClass);
    setFilteredClassList(filteredClass);
  }

  const onClearFilter = () => {
    filterForm.resetFields();
    setFilteredClassList(classList);
  }

  return (
    <>
      {/* <StyledTitle>{messages['sidebar.classManagementAdmin.classListing'] as string}</StyledTitle> */}
      <StyledTitle>Class Management</StyledTitle>

      <AppRowContainer>
        <Col xs={24} lg={24}>
          <Space>
            <Button type="primary" icon={<StyledPlusOutlined style={{ marginRight: 5 }} />} onClick={() => setNewClassModalVisible(true)} >Add new class</Button>
          </Space>
        </Col>

        <Col xs={24} lg={24}>
          {/* <FilterItem filterData={filterData} setFilterData={setFilterData} /> */}
          <AppCard title={"Filter"}>
            <Form onValuesChange={onFilterFormChange} form={filterForm}>
              <Row gutter={[16, 0]}>
                <Col span={5}>
                  <Form.Item name='teacher'>
                    <Select
                      placeholder="Select a teacher"
                      style={{ width: "100%" }}
                      onChange={() => { }}>
                      {teacherList.map((teacher: any) => (
                        <Option key={teacher.id} value={teacher.id}>{teacher.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name='class'>
                    <Select
                      placeholder="Select a class"
                      style={{ width: "100%" }}
                      onChange={() => { }}>
                      {classList.map((item: any) => (
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name='startYear'>
                    <DatePicker placeholder='Start school year' picker='year' style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name='endYear'>
                    <DatePicker placeholder='End school year' picker='year' style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Button type='primary' onClick={onClearFilter}>Clear filter</Button>
                </Col>
              </Row>
            </Form>
          </AppCard>
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
                      onChange={event => searchClass(event.target.value)}
                    />
                  </StyledOrderHeaderInputView>
                  {/* <StyledOrderHeaderPagination pageSize={10} count={total} page={page} onChange={onChange} /> */}
                </StyledOrderHeader>
              </AppsHeader>
            }
          >
            <ClassList data={filteredClassList || classList || []} loading={loading} />
            {/* <StyledOrderFooterPagination pageSize={10} count={total} page={page} onChange={onChange} /> */}
          </AppCard>
        </Col>
      </AppRowContainer>

      {/* Add new class modal */}
      <Modal
        title="Add new class"
        open={newClassModalVisible}
        onOk={() => setNewClassModalVisible(false)}
        onCancel={() => setNewClassModalVisible(false)}
        footer={false}
      >
        <Form {...formItemLayout} onValuesChange={onFormValuesChange} onFinish={onFormSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input a class name!' }]}>
            <Input placeholder='Class name' />
          </Form.Item>
          <Form.Item
            label="Location"
            name="classroom"
            rules={[{ required: true, message: 'Please select a class room!' }]}>
             <Select
              placeholder="Select a location"
              style={{ width: "100%" }}
              onChange={() => { }}>
              {locationList.map((location: any) => (
                <Option key={location.id} value={location.id}>{location.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Teacher"
            name="teacherId"
            rules={[{ required: true, message: 'Please select a teacher!' }]}>
            <Select
              placeholder="Select a teacher"
              style={{ width: "100%" }}
              onChange={() => { }}>
              {teacherList.map((teacher: any) => (
                <Option key={teacher.id} value={teacher.id}>{teacher.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Start year'
            name="startSchoolYear"
            rules={[{ required: true, message: 'Please select a start school year!' }]}
          >
            <DatePicker picker='year' />
          </Form.Item>
          <Form.Item
            label='End year'
            name="endSchoolYear"
            rules={[{ required: true, message: 'Please select an end school year!' }]}
          >
            <DatePicker picker='year' />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
              <Button type='default' onClick={() => setNewClassModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ClassListing;
