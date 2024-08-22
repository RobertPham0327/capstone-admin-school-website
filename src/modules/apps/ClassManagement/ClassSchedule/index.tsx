import React, { useState } from 'react';
import { momentLocalizer, stringOrDate } from 'react-big-calendar';
import moment from 'moment';
import { StyledCalendar } from './Calendar.style';
// import "./calendar.css";
import CustomToolbar from './CustomToolbar';
import EventItem from './EventItem';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import { TodoObjType } from '@crema/types/models/apps/Todo';
import { useRouter } from 'next/router';
import { Button, Col, DatePicker, Descriptions, Form, Input, Modal, Space, Upload } from 'antd';
import { getCurrentMonthDate } from '@crema/helpers/DateHelper';
import AppRowContainer from '@/@crema/components/AppRowContainer';
import { StyledPlusOutlined, StyledTitle } from './index.styled';
import { Calendar } from 'react-big-calendar';
import { UploadOutlined } from '@ant-design/icons';
import AppIconButton from '@/@crema/components/AppIconButton';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import dayjs from 'dayjs';

const DragAndDropCalendar = withDragAndDrop(StyledCalendar);

const localizer = momentLocalizer(moment);

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

const ClassSchedule = () => {
  const [isAddEventOpen, setAddEventOpen] = useState(false);
  const [isViewEventOpen, setViewEventOpen] = useState(false);
  const router = useRouter();
  const { classId } = router.query;

  const eventList = [
    {
      id: 2234,
      title: 'Event 3',
      startDate: "2024-08-20T10:30:00",
      endDate: "2024-08-20T11:00:00",
    },
    {
      id: 2234,
      title: 'Event 1',
      startDate: "2024-08-22T10:30:00",
      endDate: "2024-08-22T11:00:00",
    },
    {
      id: 2135,
      title: 'Event 2',
      startDate: "2024-08-22T11:30:00",
      endDate: "2024-08-22T12:00:00",
    },
  ]

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const onSelectDate = ({ start }: { start: any }) => {
    console.log('Selected: ', start);
    setSelectedDate(start);
    // setAddEventOpen(true);
  };

  const onOpenAddTask = (data: any) => {
    if (data) {
      setSelectedEvent(data);
      onViewTaskDetail(data);
    }
    // else {
    //   if (selectedDate) {
    //     setAddEventOpen(true);
    //   } else {
    //     setAddEventOpen(false);
    //   }
    // }
  };

  const onUpdateTask = (task: any) => { }

  const onViewTaskDetail = (event: any) => {
    setViewEventOpen(true);
    // router.push(`/apps/class-mangement/class-schedule/${classId}/event/${event.id}`);
  };

  const onSetFilterText = () => { }

  // const resizeEvent = ({
  //   event,
  //   start,
  //   end,
  // }: {
  //   event: object;
  //   start: stringOrDate;
  //   end: stringOrDate;
  //   isAllDay: boolean;
  // }) => {
  //   // onUpdateTask({ ...event, startDate: start, endDate: end });
  //   console.log('resizeEvent: ', event, start, end);
  // };

  const moveEvent = ({
    event,
    start,
    end,
    isAllDay: droppedOnAllDaySlot,
  }: {
    event: object;
    start: stringOrDate;
    end: stringOrDate;
    isAllDay: boolean;
  }) => {
    onUpdateTask({ ...event, startDate: start, endDate: end });
  };

  const [isUpdateEventOpen, setUpdateEventOpen] = useState(false);

  const onOpenUpdateEvent = () => {
    setUpdateEventOpen(true);
  }

  const getEvents = () => {
    if (eventList?.length > 0)
      return eventList.map(event => {
        return {
          ...event,
          title: event.title,
          start: event.startDate,
          end: event.endDate,
        };
      });
    return [];
  };

  // console.log('taskList', taskList, getEvents());

  return (
    <>
      <StyledTitle>Class schedule</StyledTitle>
      <AppRowContainer>
        <Col xs={24} lg={24}>
          <Button ghost type="primary" icon={<StyledPlusOutlined style={{ marginRight: 5 }} />} onClick={() => setAddEventOpen(true)}>Add new schedule</Button>
          <DragAndDropCalendar
            localizer={localizer}
            events={getEvents()}
            views={['month', 'agenda']}
            tooltipAccessor={undefined}
            showMultiDayTimes
            // resizable
            // onEventResize={resizeEvent}
            onEventDrop={moveEvent}
            onSelectEvent={onOpenAddTask}
            components={{
              toolbar: props => (
                <AppsHeader>
                  <CustomToolbar onSetFilterText={onSetFilterText} {...props} />
                </AppsHeader>
              ),
              event: item => <EventItem key={item.title} item={item.event} />,
            }}
            popup
            selectable
            onSelectSlot={onSelectDate}
            defaultView="month"
          />
        </Col>
      </AppRowContainer>

      <Modal
        open={isAddEventOpen}
        onOk={() => setAddEventOpen(false)}
        onCancel={() => setAddEventOpen(false)}
        footer={false}
        title={"Add new schedule"}
      >
        <Form {...formItemLayout}>
          <Form.Item
            label="Event title"
            name="title"
            rules={[{ required: true, message: 'Please input event title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start date"
            name="startDate"
            rules={[{ required: true, message: 'Please input start date!' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="End date"
            name="endDate"
            rules={[{ required: true, message: 'Please input end date!' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: false, message: 'Please upload an image!' }]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button type="primary" htmlType="submit">Submit</Button>
              <Button ghost type="primary" onClick={() => setAddEventOpen(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={isViewEventOpen}
        onOk={() => setViewEventOpen(false)}
        onCancel={() => {setViewEventOpen(false); setUpdateEventOpen(false)}}
        title={
          <Space>
            <span>Event Detail</span>
            <AppIconButton icon={<AiOutlineEdit />} onClick={() => { setUpdateEventOpen(true) }} />
            <AppIconButton icon={<AiOutlineDelete />} onClick={() => { }} />
          </Space>
        }
        footer={false}
      >
        <Form {...formItemLayout}>
          <Form.Item
            label="Event title"
            name="title"
            rules={[{ required: true, message: 'Please input event title!' }]}
          >
            <Input bordered={isUpdateEventOpen} readOnly={!isUpdateEventOpen} defaultValue={selectedEvent?.title} />
          </Form.Item>
          <Form.Item
            label="Start date"
            name="startDate"
            rules={[{ required: true, message: 'Please input start date!' }]}
          >
            <DatePicker defaultValue={dayjs('2024-08-22 22:00:00', 'YYYY-MM-DD HH:mm:ss')} disabled={!isUpdateEventOpen} bordered={isUpdateEventOpen} showTime />
          </Form.Item>
          <Form.Item
            label="End date"
            name="endDate"
            rules={[{ required: true, message: 'Please input end date!' }]}
          >
            <DatePicker bordered={isUpdateEventOpen} defaultValue={dayjs('2024-08-22 22:00:00', 'YYYY-MM-DD HH:mm:ss')} disabled={!isUpdateEventOpen} showTime />
          </Form.Item>

          {/* <Form.Item
            label="Image"
            name="image"
            rules={[{ required: false, message: 'Please upload an image!' }]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item> */}
          
          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button type="primary" htmlType="submit">Save</Button>
              <Button ghost type="primary" onClick={() => { setViewEventOpen(false); setUpdateEventOpen(false) }}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ClassSchedule;
