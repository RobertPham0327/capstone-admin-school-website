import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import React, { use, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { FilterItem, ClassList } from '@crema/modules/ClassManagement';
import AppRowContainer from '@crema/components/AppRowContainer';
import AppCard from '@crema/components/AppCard';
import { Col, Space, Modal, DatePicker } from 'antd';
import {
  StyledInputSearch,
  StyledOrderFooterPagination,
  StyledOrderHeader,
  StyledOrderHeaderInputView,
  StyledOrderHeaderPagination,
  StyledTitle,
  StyledPlusOutlined,
} from './index.styled';
import { useAppSelector, useAppDispatch } from '@toolkit/hooks';
import { Button, Form, Input, Select } from "antd";
import { ClassDataType } from '@crema/types/models/apps/ClassManagement';
import { createClassData, getAllTeacherData, getClassList } from '@/toolkit/actions/ClassManagement';

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

  const { classList, teacherList } = useAppSelector(({ classManagement }) => classManagement);

  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    dispatch(getClassList());
    dispatch(getAllTeacherData());
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
          <FilterItem filterData={filterData} setFilterData={setFilterData} />
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
            <ClassList data={classList || []} loading={loading} />
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
            rules={[{ required: true, message: 'Please input your class name!' }]}>
            <Input placeholder='Class name'/>
          </Form.Item>
          <Form.Item
            label="Location"
            name="classroom"
            rules={[{ required: true, message: 'Please input your class room!' }]}>
            <Input placeholder='Class room name'/>
          </Form.Item>
          <Form.Item
            label="Teacher"
            name="teacherId"
            rules={[{ required: true, message: 'Please select teacher!' }]}>
            <Select
              placeholder="Select a teacher"
              style={{ width: "100%" }}
              onChange={() => { }}>
                {teacherList.map((teacher: any) => (
                  <Option key={teacher.id} value={teacher.id}>{teacher.name}</Option>
                ))}
              {/* <Option value='1'>Dumbledore</Option>
              <Option value='2'>Robin Hood</Option>
              <Option value='3'>Optimus Prime</Option> */}
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
