import React, { useEffect, useState } from 'react';
import { momentLocalizer, stringOrDate } from 'react-big-calendar';
import moment from 'moment';
import { StyledCalendar } from './Calendar.style';
// import "./calendar.css";
import CustomToolbar from './CustomToolbar';
import EventItem from './EventItem';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import { useRouter } from 'next/router';
import { Button, Col, DatePicker, Descriptions, Form, Input, message, Modal, Select, Space, Upload } from 'antd';
import { getCurrentMonthDate, getIOStringDate } from '@crema/helpers/DateHelper';
import AppRowContainer from '@/@crema/components/AppRowContainer';
import { StyledPlusOutlined, StyledTitle } from './index.styled';
import { UploadOutlined } from '@ant-design/icons';
import AppIconButton from '@/@crema/components/AppIconButton';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import dayjs from 'dayjs';
import { sampleClassScheduleList } from '../mockData';
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks';
import { addClassScheduleData, deleteClassScheduleData, getAllClassSchedulesData, getAllLocationData, getAllSubjectData, getAllTeacherData, updateClassScheduleData } from '@/toolkit/actions/ClassManagement';


const DragAndDropCalendar = withDragAndDrop(StyledCalendar);

const localizer = momentLocalizer(moment);

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
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
      offset: 6,
    },
  },
};

const confirm = Modal.confirm;

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

  const [updateEventForm] = Form.useForm();
  const [newEventForm] = Form.useForm();

  const onSelectDate = ({ start }: { start: any }) => {
    console.log('Selected: ', start);
    setSelectedDate(start);
    // setAddEventOpen(true);
  };

  const onOpenAddTask = (data: any) => {
    if (data) {
      setSelectedEvent(data);
      onViewEventDetail(data);
    }
    // else {
    //   if (selectedDate) {
    //     setAddEventOpen(true);
    //   } else {
    //     setAddEventOpen(false);
    //   }
    // }
  };

  // const onUpdateTask = (task: any) => { }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this event?',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteClassScheduleData(selectedEvent.id));
        message.success('Event deleted successfully')
        setUpdateEventOpen(false);
        setViewEventOpen(false);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const onViewEventDetail = (event: any) => {
    console.log('View event detail:', event);
    updateEventForm.setFieldsValue({
      subject: subjectList.find((subject: any) => subject.name === event?.title)?.id,
      start: dayjs(event?.start, 'YYYY-MM-DD HH:mm:ss'),
      end: dayjs(event?.end, 'YYYY-MM-DD HH:mm:ss'),
      teacher: event?.teacher_id,
      location: event?.location_id,
    })
    setViewEventOpen(true);
  };

  const onSetFilterText = () => { }

  const [isUpdateEventOpen, setUpdateEventOpen] = useState(false);

  const onOpenUpdateEvent = () => {
    setUpdateEventOpen(true);
  }

  const onAddEventFormChange = (changedValues: any, allValues: any) => {
    console.log('allValues:', allValues);
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllClassSchedulesData(Number(classId)));
    dispatch(getAllSubjectData());
    dispatch(getAllTeacherData());
    dispatch(getAllLocationData());
  }, [dispatch]);

  const { classScheduleList, teacherList, subjectList, locationList } = useAppSelector(state => state.classManagement);

  const onAddNewEvent = (values: any) => {
    const newSchedule = {
      subject_id: values.subject,
      teacher_id: values.teacher, 
      location_id: values.location,
      start_time: getIOStringDate(values.start),
      end_time: getIOStringDate(values.end),
      subject_name: subjectList.find((subject: any) => subject.id === values.subject)?.name,
      teacher_name: teacherList.find((teacher: any) => teacher.id === values.teacher)?.name,
      location_name: locationList.find((location: any) => location.id === values.location)?.name,
    }
    dispatch(addClassScheduleData(Number(classId), newSchedule));
    setAddEventOpen(false);
    message.success('Event added successfully');
    newEventForm.resetFields();
  }

  const onUpdateEventFormChange = (changedValues: any, allValues: any) => {
    console.log('allValues:', allValues);
  }

  const onUpdateEventSubmit = (values: any) => {
    const newScheduleData = {
      subject_id: values.subject,
      teacher_id: values.teacher,
      location_id: values.location,
      start_time: getIOStringDate(values.start),
      end_time: getIOStringDate(values.end),
      // subject_name: subjectList.find((subject: any) => subject.id === values.subject)?.name,
      // teacher_name: teacherList.find((teacher: any) => teacher.id === values.teacher)?.name,
      // location_name: locationList.find((location: any) => location.id === values.location)?.name,
    }
    dispatch(updateClassScheduleData(selectedEvent.id, newScheduleData));
    setUpdateEventOpen(false);
    setViewEventOpen(false);
    message.success('Event updated successfully');
  }


  return (
    <>
      <StyledTitle>Class schedule</StyledTitle>

      <AppRowContainer>
        <Col xs={24} lg={24}>
          <Button type="primary" icon={<StyledPlusOutlined style={{ marginRight: 5 }} />} onClick={() => setAddEventOpen(true)}>Add new schedule</Button>
          <StyledCalendar
            localizer={localizer}
            events={classScheduleList}
            views={['month', 'agenda']}
            tooltipAccessor={undefined}
            showMultiDayTimes
            // resizable
            // onEventResize={resizeEvent}
            // onEventDrop={moveEvent}
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

      {/* New Event Modal */}
      <Modal
        open={isAddEventOpen}
        onOk={() => setAddEventOpen(false)}
        onCancel={() => setAddEventOpen(false)}
        footer={false}
        title={"Create a new event"}
      >
        <Form form={newEventForm} {...formItemLayout} onValuesChange={onAddEventFormChange} onFinish={onAddNewEvent}>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please input a subject name!' }]}
          >
            <Select>
              {subjectList.map((subject: any) => (
                <Select.Option key={subject.id} value={subject.id}>{subject.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Teacher"
            name="teacher"
            rules={[{ required: true, message: 'Please input teacher name!' }]}
          >
            <Select>
              {teacherList.map((teacher: any) => (
                <Select.Option key={teacher.id} value={teacher.id}>{teacher.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please input location name!' }]}
          >
            <Select>
              {locationList.map((location: any) => (
                <Select.Option key={location.id} value={location.id}>{location.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Start time"
            name="start"
            rules={[{ required: true, message: 'Please input start date!' }]}
          >
            <DatePicker showTime />
          </Form.Item>

          <Form.Item
            label="End time"
            name="end"
            rules={[{ required: true, message: 'Please input end date!' }]}
          >
            <DatePicker showTime />
          </Form.Item>

          {/* <Form.Item
            label="Image"
            name="image"
            rules={[{ required: false, message: 'Please upload an image!' }]}
          >
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item> */}

          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button type="primary" htmlType="submit">Submit</Button>
              <Button ghost type="primary" onClick={() => setAddEventOpen(false)}>Cancel</Button>
            </Space>
          </Form.Item>

        </Form>
      </Modal>

      {/* Event Detail Modal */}
      <Modal
        open={isViewEventOpen}
        onOk={() => setViewEventOpen(false)}
        onCancel={() => { setViewEventOpen(false); setUpdateEventOpen(false) }}
        title={
          <Space>
            <span>Event Detail</span>
            <AppIconButton icon={<AiOutlineEdit />} onClick={() => { setUpdateEventOpen(true) }} />
            {isUpdateEventOpen && <AppIconButton icon={<AiOutlineDelete />} onClick={() => showDeleteConfirm()} />}
          </Space>
        }
        footer={false}
      >
        <Form
          {...formItemLayout}
          form={updateEventForm}
          // initialValues={
          //   {
          //     title: selectedEvent?.title,
          //     start: dayjs(selectedEvent?.start, 'YYYY-MM-DD HH:mm:ss'),
          //     end: dayjs(selectedEvent?.end, 'YYYY-MM-DD HH:mm:ss'),
          //     teacher: selectedEvent?.teacher_name,
          //     location: selectedEvent?.location_name,
          //   }
          // }
          disabled={!isUpdateEventOpen}
          onValuesChange={onUpdateEventFormChange}
          onFinish={onUpdateEventSubmit}
        >
          <Form.Item
            label="Subject"
            name="subject"
          // rules={[{ required: true, message: 'Please input event title!' }]}
          >
            <Select bordered={isUpdateEventOpen}>
              {subjectList.map((subject: any) => (
                <Select.Option key={subject.id} value={subject.id}>{subject.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Teacher"
            name="teacher"
          // rules={[{ required: true, message: 'Please input event title!' }]}
          >
            <Select bordered={isUpdateEventOpen}>
              {teacherList.map((teacher: any) => (
                <Select.Option key={teacher.id} value={teacher.id}>{teacher.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
          // rules={[{ required: true, message: 'Please input event title!' }]}
          >
            <Select bordered={isUpdateEventOpen}>
              {locationList.map((location: any) => (
                <Select.Option key={location.id} value={location.id}>{location.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Start time"
            name="start"
          // rules={[{ required: true, message: 'Please input start date!' }]}
          >
            <DatePicker bordered={isUpdateEventOpen} showTime />
          </Form.Item>
          <Form.Item
            label="End time"
            name="end"
          // rules={[{ required: true, message: 'Please input end date!' }]}
          >
            <DatePicker bordered={isUpdateEventOpen} showTime />
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
              {isUpdateEventOpen ? (<>
                <Button type="primary" htmlType="submit">Save</Button>
                <Button type="primary" ghost onClick={() => setUpdateEventOpen(false)}>Cancel</Button>
              </>) : (
                <Button disabled={false} type="primary" onClick={() => { setViewEventOpen(false); setUpdateEventOpen(false) }}>Close</Button>
              )}
            </Space>
          </Form.Item>
          {/* <Button ghost type="primary" onClick={() => { setViewEventOpen(false); setUpdateEventOpen(false) }}>Close</Button> */}
        </Form>
      </Modal>
    </>
  );
};
export default ClassSchedule;
