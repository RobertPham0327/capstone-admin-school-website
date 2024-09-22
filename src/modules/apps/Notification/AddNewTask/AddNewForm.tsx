import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import { Form, Input } from 'antd';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import {
  StyledTodoAddTaskForm,
  StyledTodoModalFooter,
  StyledTodoModelBtn,
  StyledTodoModelContent,
  StyledTodoInput,
} from './index.styled';
import dayjs, { Dayjs } from 'dayjs';
import { postDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { toast } from 'react-toastify';

type AddNotificationFormProps = {
  reCallAPI?: any;
  onCloseAddTask: () => void;
  selectedDate?: Dayjs;
};

const AddNotificationForm: React.FC<AddNotificationFormProps> = ({ onCloseAddTask, selectedDate, reCallAPI }) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { user } = useAuthUser();

  const onFinish = (values: any) => {
    const newNotification = {
      ...values,
      // created_at: dayjs().format(), // Set the created_at field for notifications
    };

    postDataApi('/notification', infoViewActionsContext, newNotification) // Adjust API endpoint to '/notification'
      .then(() => {
        if (reCallAPI) reCallAPI()
        infoViewActionsContext.showMessage('New Notification has been created successfully!');
        toast.success('New notification has been created successfully!');
      })
      .catch(error => {
        infoViewActionsContext.fetchError(error.message);
      });

    onCloseAddTask();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    onCloseAddTask();
  };

  const { messages } = useIntl();

  return (
    <StyledTodoAddTaskForm
      name="basic"
      // initialValues={{
      //   scheduleDate: selectedDate ? dayjs(selectedDate, 'MMM DD,YYYY') : '',
      // }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <StyledTodoModelContent>
        <Form.Item
          className="form-field"
          name="title"
          rules={[{ required: true, message: 'Please input your Notification Title!' }]}
        >
          <StyledTodoInput placeholder={messages['notification.notificationTitle'] as string} />
        </Form.Item>

        <Form.Item className="form-field" name="message">
          <Input.TextArea
            placeholder={messages['notification.notificationBody'] as string}
            autoSize={{ minRows: 8, maxRows: 10 }}
          />
        </Form.Item>
      </StyledTodoModelContent>

      <StyledTodoModalFooter>
        <StyledTodoModelBtn htmlType="submit">
          <IntlMessages id="notification.send" />
        </StyledTodoModelBtn>
      </StyledTodoModalFooter>
    </StyledTodoAddTaskForm>
  );
};

export default AddNotificationForm;
