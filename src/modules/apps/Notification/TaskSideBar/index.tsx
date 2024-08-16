import React from "react";
import AddNewTask from "../AddNewTask";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppsSideBarFolderItem from "@crema/components/AppsSideBarFolderItem";
import AppList from "@crema/components/AppList";
import ListEmptyResult from "@crema/components/AppList/ListEmptyResult";
import SidebarPlaceholder from "@crema/components/AppSkeleton/SidebarListSkeleton";
import { Button } from "antd";
import {
  StyledPlusOutlined,
  StyledTodoScrollbar,
  StyledTodoSidebarContent,
  StyledTodoSidebarHeader,
  StyledTodoSidebarList,
  StyledTodoSidebarTitle,
} from "./index.styled";
import { useAppSelector } from "../../../../toolkit/hooks";
import { TaskLabelItem } from "@crema/modules/Notification";

const TaskSideBar = () => {
  const labelList = useAppSelector(({ todoApp }) => todoApp.labelList);
  const folderList = useAppSelector(({ todoApp }) => todoApp.folderList);

  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  return (
    <>
      <StyledTodoSidebarHeader>
        <Button
          ghost
          type="primary"
          icon={<StyledPlusOutlined style={{ marginRight: 8 }} />}
          onClick={onOpenAddTask}
        >
          <IntlMessages id="notification.newNotification" />
        </Button>
      </StyledTodoSidebarHeader>

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
        />
      ) : null}
    </>
  );
};

export default TaskSideBar;
