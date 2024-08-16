import React from "react";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useIntl } from "react-intl";
import { Col, Form, Input, Select } from "antd";
import AppRowContainer from "@crema/components/AppRowContainer";
import { useAuthUser } from "@crema/hooks/AuthHooks";
import {
  StyledAddTaskFormDate,
  StyledSelectRow,
  StyledTodoAddTaskForm,
  StyledTodoInput,
  StyledTodoModalFooter,
  StyledTodoModelBtn,
  StyledTodoModelContent,
  StyledTodoSelectAvatar,
  StyledTodoSelectName,
} from "./index.styled";
import dayjs, { Dayjs } from "dayjs";
import { postDataApi, useGetDataApi } from "@crema/hooks/APIHooks";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import {
  LabelObjType,
  PriorityObjType,
  StaffObjType,
} from "@crema/types/models/apps/Todo";
import { generateRandomUniqueNumber } from "@crema/helpers/Common";

type AddTaskFormProps = {
  reCallAPI?: any;
  onCloseAddTask: () => void;
  selectedDate?: Dayjs;
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onCloseAddTask,
  selectedDate,
  reCallAPI,
}) => {
  const [{ apiData: labelList }] = useGetDataApi("/api/todo/labels/list", []);
  const [{ apiData: priorityList }] = useGetDataApi(
    "/api/todo/priority/list",
    []
  );
  const [{ apiData: staffList }] = useGetDataApi("/api/todo/staff/list", []);

  const infoViewActionsContext = useInfoViewActionsContext();
  const { user } = useAuthUser();

  const onFinish = (values: any) => {
    const staff = staffList.find(
      (staff: StaffObjType) => staff.id === +values.staffList
    );

    const priority = priorityList.find(
      (label: PriorityObjType) => +values.priorityList === label.id
    );
    const label = labelList.filter(
      (label: LabelObjType) => +values.labelList === label.id
    );

    const newTask = {
      ...values,
      id: generateRandomUniqueNumber(),
      isStarred: false,
      hasAttachments: false,
      sentAt: "10.30am",
      isRead: true,
      folderValue: 120,
      createdBy: {
        name: user.displayName ? user.displayName : "user",
        image: user.photoURL ? user.photoURL : "/assets/images/dummy2.jpg",
      },
      scheduleDate: dayjs(values.scheduleDate).format("lll"),
      assignedTo: staff,
      createdOn: dayjs().format("MMM DD"),
      status: 1,
      comments: [],
      label: label,
      priority: priority,
    };
    console.log(newTask);
    postDataApi("/api/todoApp/compose", infoViewActionsContext, {
      task: newTask,
    })
      .then(() => {
        reCallAPI();
        infoViewActionsContext.showMessage(
          "New Task has been created successfully!"
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    onCloseAddTask();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    onCloseAddTask();
  };

  const { messages } = useIntl();

  const { Option } = Select;

  return (
    <StyledTodoAddTaskForm
      name="basic"
      initialValues={{
        scheduleDate: selectedDate ? dayjs(selectedDate, "MMM DD,YYYY") : "",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <StyledTodoModelContent>
        <Form.Item
          className="form-field"
          name="title"
          rules={[{ required: true, message: "Please input your Notification Title!" }]}
        >
          <StyledTodoInput placeholder={messages["notification.notificationTitle"] as string} />
        </Form.Item>

        <Form.Item className="form-field" name="notification body">
          <Input.TextArea
            placeholder={messages["notification.notificationBody"] as string}
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

export default AddTaskForm;
