import React, { useEffect, useState } from 'react';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { StyledCalendar } from './Calendar.style';
// import "./calendar.css";
import CustomToolbar from './CustomToolbar';
import EventItem from './EventItem';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import { useRouter } from 'next/router';
import { Button, Col, DatePicker, Divider, Form, Input, message, Modal, Select, Space, Upload } from 'antd';
import { getIOStringDate } from '@crema/helpers/DateHelper';
import AppRowContainer from '@/@crema/components/AppRowContainer';
import { StyledMinusOutlined, StyledPlusOutlined, StyledTitle } from './index.styled';
import { Calendar } from 'react-big-calendar';
import { MinusOutlined, UploadOutlined } from '@ant-design/icons';
import AppIconButton from '@/@crema/components/AppIconButton';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import dayjs from 'dayjs';
import { addEatingScheduleData, deleteEatingScheduleData, getAllEatingSchedulesData, getAllLocationData, updateEatingScheduleData } from '@/toolkit/actions/ClassManagement';
import { useAppDispatch, useAppSelector } from '@/toolkit/hooks';

const DragAndDropCalendar = withDragAndDrop(StyledCalendar);

const { Option } = Select;

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

const EatingSchedule = () => {
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllEatingSchedulesData(Number(classId)));
    dispatch(getAllLocationData())
  }, [dispatch]);

  const { eatingScheduleList, locationList } = useAppSelector(state => state.classManagement); 

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

  const isOverlapping = (start: Date, end: Date) => {
    return eatingScheduleList.some(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return (start < eventEnd && end > eventStart);
    });
  };

  const isValidForm = (values: any) => {
    if (!values.meal || !values.start || !values.end || !values.location || !values.menu || !values.nutrition) {
      return { isValid: false, message: 'Please fill in all required fields!' };
    }
    if (values.menu.length < 2 || values.nutrition.length < 2) {
      return { isValid: false, message: 'Please input at least 2 dish names and 2 nutrition names!' };
    }

    if (values.start >= values.end) {
      return { isValid: false, message: 'Start time must be before end time!' };
    }

    if (isOverlapping(values.start, values.end)) {
      return { isValid: false, message: 'The event is overlapping with other events!' };
    }

    
    
    return { isValid: true };
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this event?',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteEatingScheduleData(selectedEvent.id));
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
    console.log('Event detail:', event);
    updateEventForm.setFieldsValue({
      meal: event?.title,
      start: dayjs(event?.start, 'YYYY-MM-DD HH:mm:ss'),
      end: dayjs(event?.end, 'YYYY-MM-DD HH:mm:ss'),
      location: event?.location_id,
      menu: event?.menu,
      nutrition: event?.nutrition,
    })
    setMenuCount(event?.menu?.length);
    setNutritionCount(event?.nutrition?.length);
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

  const onAddNewEvent = (values: any) => {
    const newEvent = {
      meal: values.meal,
      start: getIOStringDate(values.start),
      end: getIOStringDate(values.end),
      location: values.location,
      menu: values.menu,
      nutrition: values.nutrition,
    }
    console.log('New event:', newEvent);
    if (!isValidForm(values).isValid) {
      message.error(isValidForm(values).message);
      message.error('Failed to add event');
      return;
    }
    dispatch(addEatingScheduleData(Number(classId), newEvent))
    setAddEventOpen(false);
    message.success('Event added successfully');
    newEventForm.resetFields();
  }

  const onUpdateEventFormChange = (changedValues: any, allValues: any) => {
    console.log('allValues:', allValues);
  }

  const onUpdateEventSubmit = (values: any) => {
    // console.log('Selected event:', selectedEvent);
    const newEvent = {
      meal: values.meal,
      start: getIOStringDate(values.start),
      end: getIOStringDate(values.end),
      location: values.location,
      menu: values.menu,
      nutrition: values.nutrition,
      files: values.image,
    }

    console.log('Update event:', newEvent);

    if (!isValidForm(newEvent).isValid) {
      message.error(isValidForm(values).message);
      message.error('Failed to update event');
      return;
    }

    dispatch(updateEatingScheduleData(selectedEvent.id, newEvent));
    setUpdateEventOpen(false);
    setViewEventOpen(false);
    message.success('Event updated successfully');
  }

  const [menuCount, setMenuCount] = useState(1);

  const [nutritionCount, setNutritionCount] = useState(1);

  const onUpdateEventOpen = () => {
    setUpdateEventOpen(true);
  }

  const onMenuDeleteForUpdating = (index: number) => {
    console.log('Delete menu:', index);
    updateEventForm.setFieldsValue({
      menu: updateEventForm.getFieldValue('menu')?.filter((_: any, i: number) => i !== index)
    });
  }

  const onNutritionDeleteForUpdating = (index: number) => {
    console.log('Delete nutrition:', index);
    updateEventForm.setFieldsValue({
      nutrition: updateEventForm.getFieldValue('nutrition')?.filter((_: any, i: number) => i !== index)
    });
  }

  const onMenuDeleteForCreating = (index: number) => {
    console.log('Delete menu:', index);
    newEventForm.setFieldsValue({
      menu: newEventForm.getFieldValue('menu')?.filter((_: any, i: number) => i !== index)
    });
  }

  const onNutritionDeleteForCreating = (index: number) => {
    console.log('Delete nutrition:', index);
    newEventForm.setFieldsValue({
      nutrition: newEventForm.getFieldValue('nutrition')?.filter((_: any, i: number) => i !== index)
    });
  }

  const onOpenAddNewEvent = () => {
    setAddEventOpen(true);
    setMenuCount(2);
    setNutritionCount(2);
  }

  return (
    <>
      <StyledTitle>Meal schedule</StyledTitle>
      <AppRowContainer>
        <Col xs={24} lg={24}>
          <Button type="primary" icon={<StyledPlusOutlined style={{ marginRight: 5 }} />} onClick={onOpenAddNewEvent}>Add new schedule</Button>
          <StyledCalendar
            localizer={localizer}
            events={eatingScheduleList}
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
        onCancel={() => {setAddEventOpen(false); newEventForm.resetFields()}}
        footer={false}
        title={"Create a new event"}>
        <Form form={newEventForm} {...formItemLayout} onValuesChange={onAddEventFormChange} onFinish={onAddNewEvent}>
          {/* <Divider style={{  borderColor: '#000' }} orientation="left">Menu infor</Divider> */}
          <Form.Item
            label="Meal"
            name="meal"
            rules={[{ required: true, message: 'Please select a meal type!' }]}
          >
            <Select
              placeholder="Select a meal type"
              style={{ width: "100%" }}
              onChange={() => { }}>
              <Option value='Breakfast'>Breakfast</Option>
              <Option value='Lunch'>Lunch</Option>
              <Option value='Dinner'>Dinner</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Menu"
            name="menu"
            rules={[{ required: true, message: 'Please input at least 2 dish names!' }]}
          >
            {
              Array.from({ length: menuCount }, (_, index) => (
                <Form.Item key={index} name={['menu', index]} noStyle>
                  <Input key={index} placeholder='Dish name' style={{ marginBottom: '10px' }} />
                </Form.Item>
              ))
            }
            {
              menuCount < 3 && <Button onClick={() => setMenuCount(prev => prev + 1)} type="dashed" style={{ width: '100%', marginBottom: '10px' }} icon={<StyledPlusOutlined />}>Add Dish</Button>
            }
            {
              menuCount > 2 && <Button onClick={() => {setMenuCount(prev => prev - 1); onMenuDeleteForCreating(menuCount-1)}} type="dashed" style={{ width: '100%', marginBottom: '10px' }} icon={<StyledMinusOutlined />}>Remove Dish</Button>
            }
          </Form.Item>

          <Form.Item
            label="Nutrition"
            name="nutrition"
            rules={[{ required: true, message: 'Please input at least 2 nutrition names!' }]}
          >
             {
              Array.from({ length: nutritionCount }, (_, index) => (
                <Form.Item key={index} name={['nutrition', index]} noStyle>
                  <Input key={index} placeholder='Nutrition name' style={{ marginBottom: '10px' }} />
                </Form.Item>
              ))
            }
            {
              nutritionCount < 3 && <Button onClick={() => setNutritionCount(prev => prev + 1)} type="dashed" style={{ width: '100%', marginBottom: '10px' }} icon={<StyledPlusOutlined />}>Add Nutrition</Button>
            }
            {
              nutritionCount > 2 && <Button onClick={() => {setNutritionCount(prev => prev - 1); onNutritionDeleteForCreating(nutritionCount-1)}} type="dashed" style={{ width: '100%', marginBottom: '10px' }} icon={<StyledMinusOutlined />}>Remove Nutrition</Button>
            }
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please select a location!' }]}
          >
            <Select>
              {
                locationList.map(location => (
                  <Option key={location.id} value={location.id}>{location.name}</Option>
                ))
              }
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

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: false, message: 'Please upload an image!' }]}
          >
            <Upload maxCount={1}>
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

      {/* Event Detail Modal */}
      <Modal
        open={isViewEventOpen}
        onOk={() => setViewEventOpen(false)}
        onCancel={() => { setViewEventOpen(false); setUpdateEventOpen(false) }}
        title={
          <Space>
            <span>Event Detail</span>
            <AppIconButton icon={<AiOutlineEdit />} onClick={onUpdateEventOpen} />
            {isUpdateEventOpen && <AppIconButton icon={<AiOutlineDelete />} onClick={() => showDeleteConfirm()} />}
          </Space>
        }
        footer={false}>
        <Form
          {...formItemLayout}
          form={updateEventForm}
          disabled={!isUpdateEventOpen}
          onValuesChange={onUpdateEventFormChange}
          onFinish={onUpdateEventSubmit}
        >
          <Form.Item
            label="Meal"
            name="meal"
          // rules={[{ required: true, message: 'Please input event title!' }]}
          >
             <Select
              bordered={isUpdateEventOpen}
              placeholder="Select a meal type"
              style={{ width: "100%" }}
              onChange={() => { }}>
              <Option value='Breakfast'>Breakfast</Option>
              <Option value='Lunch'>Lunch</Option>
              <Option value='Dinner'>Dinner</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Menu"
            name="menu"
          >
            {
              Array.from({ length: menuCount }, (_, index) => (
                <Form.Item key={index} name={['menu', index]} noStyle>
                  <Input required key={index} placeholder='Dish name' style={{ marginBottom: '10px' }} bordered={isUpdateEventOpen}/>
                </Form.Item>
              ))
            }
            {
              menuCount < 3  && isUpdateEventOpen && <Button onClick={() => setMenuCount(prev => prev + 1)} type="dashed" style={{ width: '100%', marginBottom: '10px' }} icon={<StyledPlusOutlined />}>Add Dish</Button>
            }
            {
              menuCount > 2 && isUpdateEventOpen && <Button onClick={() => {setMenuCount(prev => prev - 1); onMenuDeleteForUpdating(menuCount-1)}} type="dashed" style={{ width: '100%', marginBottom: '10px' }} icon={<StyledMinusOutlined />}>Remove Dish</Button>
            }
          </Form.Item>

          <Form.Item
            label="Nutrition"
            name="nutrition"
          >
             {
              Array.from({ length: nutritionCount }, (_, index) => (
                <Form.Item key={index} name={['nutrition', index]} noStyle>
                  <Input required key={index} placeholder='Nutrition name' style={{ marginBottom: '10px' }} bordered={isUpdateEventOpen}/>
                </Form.Item>
              ))
            }
            {
              nutritionCount < 3 && isUpdateEventOpen && <Button onClick={() => setNutritionCount(prev => prev + 1)} type="dashed" style={{ width: '100%', marginBottom: '10px' }} icon={<StyledPlusOutlined />}>Add Nutrition</Button>
            }
            {
              nutritionCount > 2 && isUpdateEventOpen && <Button onClick={() => {setNutritionCount(prev => prev - 1); onNutritionDeleteForUpdating(nutritionCount-1)}} type="dashed" style={{ width: '100%', marginBottom: '10px' }} icon={<StyledMinusOutlined />}>Remove Nutrition</Button>
            }
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
          >
            <Select bordered={isUpdateEventOpen}>
              {
                locationList.map(location => (
                  <Option key={location.id} value={location.id}>{location.name}</Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="Start time"
            name="start"
          >
            <DatePicker bordered={isUpdateEventOpen} showTime />
          </Form.Item>
          <Form.Item
            label="End time"
            name="end"
          >
            <DatePicker bordered={isUpdateEventOpen} showTime />
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
export default EatingSchedule;
