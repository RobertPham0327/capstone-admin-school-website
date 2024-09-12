import React, { useEffect, useState } from 'react';
import TaskContentHeader from './TaskContentHeader';
import AddNewTask from '../AddNewTask';
import AppsPagination from '@crema/components/AppsPagination';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import TodoListSkeleton from '@crema/components/AppSkeleton/TodoListSkeleton';
import AppList from '@crema/components/AppList';
import { StyledTodoFooter, StyledTodoListDesktop, StyledTodoListMobile } from './index.styled';
import { TaskListItemMobile } from '@crema/modules/Notification';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { onDeleteSelectedTasks, onGetTaskList } from '../../../../toolkit/actions';
// import { NotificationObjType } from '@crema/types/models/apps/Notification'; // Updated to NotificationObjType
import { TodoObjType } from '@crema/types/models/apps/Todo';
import { useRouter } from 'next/router';
import TaskListItem from './TaskListItem';

const TasksList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { all, asPath } = router.query;

  const notificationList = useAppSelector(({ todoApp }) => todoApp.taskList); // taskList now refers to notifications

  const totalNotifications = useAppSelector(({ todoApp }) => todoApp.totalTasks); // Update variable name for clarity

  const loading = useAppSelector(({ common }) => common.loading);

  const [page, setPage] = useState(0);
  const [filterText, onSetFilterText] = useState<string>('');
  const [checkedNotifications, setCheckedNotifications] = useState<number[]>([]);
  const [isAddTaskOpen, setAddTaskOpen] = useState<boolean>(false);

  useEffect(() => {
    setPage(0);
  }, [asPath]);

  useEffect(() => {
    dispatch(onGetTaskList()); // Fetch the notification list
  }, [dispatch]);

  useEffect(() => {
    console.log('Notification List:', notificationList); // Add this for debugging
  }, [notificationList]);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const onChangeCheckedNotifications = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedNotifications(checkedNotifications.concat(id));
    } else {
      setCheckedNotifications(checkedNotifications.filter(notificationId => notificationId !== id));
    }
  };

  const onPageChange = (value: number) => {
    setPage(value);
  };

  // const onChangeStarred = (checked: boolean, notification: TodoObjType) => {
  //   dispatch(onUpdateTaskStarredStatus([notification.id], checked, all[1]));
  // };

  const onDeleteSelectedNotification = (notification: TodoObjType) => {
    dispatch(onDeleteSelectedTasks([notification.id], all[0], all[1], page));
  };

  const onGetFilteredItems = () => {
    if (filterText === '') {
      return notificationList;
    } else {
      return notificationList.filter(notification => notification.title.toUpperCase().includes(filterText.toUpperCase()));
    }
  };

  const list = onGetFilteredItems();
  return (
    <>
      <AppsHeader>
        <TaskContentHeader
          taskLists={notificationList} // Render notification list
          checkedTasks={checkedNotifications}
          setCheckedTasks={setCheckedNotifications}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          onPageChange={onPageChange}
          page={page}
        />
      </AppsHeader>
      <AppsContent>
        <>
          <StyledTodoListDesktop>
            <AppList
              data={list}
              renderItem={notification => (
                <TaskListItem
                  key={notification.id}
                  task={notification}
                  onChangeCheckedTasks={onChangeCheckedNotifications}
                  checkedTasks={checkedNotifications}
                  // onChangeStarred={onChangeStarred}
                  onUpdateSelectedTask={onDeleteSelectedNotification}
                />
              )}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Add Notification"
                  onClick={onOpenAddTask}
                  placeholder={<TodoListSkeleton />}
                />
              }
            />
          </StyledTodoListDesktop>
          <StyledTodoListMobile>
            <AppList
              data={list}
              renderItem={notification => (
                <TaskListItemMobile
                  key={notification.id}
                  task={notification} // Adjust to notification
                  checkedTasks={checkedNotifications}
                  // onChangeStarred={onChangeStarred}
                  onChangeCheckedTasks={onChangeCheckedNotifications}
                />
              )}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Add Notification"
                  onClick={onOpenAddTask}
                  placeholder={<TodoListSkeleton />}
                />
              }
            />
          </StyledTodoListMobile>
        </>
      </AppsContent>
      {isAddTaskOpen ? <AddNewTask isAddTaskOpen={isAddTaskOpen} onCloseAddTask={onCloseAddTask} /> : null}
    </>
  );
};

export default TasksList;
