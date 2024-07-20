import AppCard from '@crema/components/AppCard';
import React from 'react';
import AppRowContainer from '@crema/components/AppRowContainer';
import dayjs from 'dayjs';
import { Col, DatePicker, Form, InputNumber, Select } from 'antd';
import { StyledFormWrapper, StyledTitleFilter } from './index.styled';
import { FilterType } from '@crema/types/models/ecommerce/EcommerceApp';

const { Option } = Select;

const statusList = [
  {
    id: 1,
    name: 'In Stock',
    value: true,
  },
  {
    id: 2,
    name: 'Out of Stock',
    value: false,
  },
];

const teacherList = [
  {
    id: 1,
    name: 'Teacher 1',
    value: true,
  },
  {
    id: 2,
    name: 'Teacher 2',
    value: false,
  },
];

const schoolList = [
  {
    id: 1,
    name: 'School 1',
    value: true,
  },
  {
    id: 2,
    name: 'School 2',
    value: false,
  },
];

type Props = {
  filterData: FilterType;
  setFilterData: React.Dispatch<React.SetStateAction<FilterType>>;
};

const Filter = ({ filterData, setFilterData }: Props) => {
  return (
    <AppCard title="Filter Item">
      <StyledFormWrapper>
        <AppRowContainer>
          <Col xs={24} md={8}>
            <StyledTitleFilter>Status</StyledTitleFilter>
            <Select
              placeholder="status"
              onChange={value => {
                setFilterData(prev => ({
                  ...prev,
                  inStock: [value === 1],
                }));
              }}
            >
              {statusList.map(status => (
                <Option key={status.id} value={status.id}>
                  {status.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} lg={8} md={12}>
            <StyledTitleFilter>Start Date</StyledTitleFilter>
            <DatePicker
              style={{ width: '100%' }}
              defaultValue={filterData?.createdAt?.start as any}
              allowClear={false}
              onChange={value => {
                console.log('DatePickervalue', value, dayjs(value).format('DD MMM YYYY'));
                setFilterData(prev => ({
                  ...prev,
                  createdAt: {
                    start: dayjs(value).format('DD MMM YYYY'),
                    end: filterData?.createdAt?.end,
                  },
                }));
              }}
            />
          </Col>
          <Col xs={24} lg={8} md={12}>
            <StyledTitleFilter>End Date</StyledTitleFilter>
            <DatePicker
              style={{ width: '100%' }}
              defaultValue={filterData?.createdAt?.end as any}
              allowClear={false}
              onChange={value =>
                setFilterData(prev => ({
                  ...prev,
                  createdAt: {
                    start: filterData?.createdAt?.start,
                    end: dayjs(value).format('DD MMM YYYY'),
                  },
                }))
              }
            />
          </Col>
          <Col xs={24} lg={8} md={12}>
            <StyledTitleFilter>Teachers</StyledTitleFilter>
            <Select
              placeholder="teacher"
              onChange={value => {
                setFilterData(prev => ({
                  ...prev,
                  inStock: [value === 1],
                }));
              }}
            >
              {teacherList.map(status => (
                <Option key={status.id} value={status.id}>
                  {status.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} lg={8} md={12}>
          <StyledTitleFilter>Schools</StyledTitleFilter>
            <Select
              placeholder="school"
              onChange={value => {
                setFilterData(prev => ({
                  ...prev,
                  inStock: [value === 1],
                }));
              }}
            >
              {schoolList.map(status => (
                <Option key={status.id} value={status.id}>
                  {status.name}
                </Option>
              ))}
            </Select>
          </Col>
        </AppRowContainer>
      </StyledFormWrapper>
    </AppCard>
  );
};

export default Filter;
