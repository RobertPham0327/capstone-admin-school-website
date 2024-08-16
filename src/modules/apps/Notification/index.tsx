import React, { useEffect } from 'react';
import TaskSideBar from './TaskSideBar/index';
import TasksList from './TaskList';
import TaskDetail from './TaskDetail';
import { useIntl } from 'react-intl';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../toolkit/hooks';
import {
  onGetToDoFolderList,
  onGetToDoLabelList,
  onGetToDoPriorityList,
  onGetToDoStaffList,
  onGetToDoStatusList,
} from '../../../toolkit/actions';

const Notification = () => {
  const dispatch = useAppDispatch();
  const { query } = useRouter();    

  useEffect(() => {
    dispatch(onGetToDoLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoPriorityList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoStaffList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoStatusList());
  }, [dispatch]);

  const onGetMainComponent = () => {
    if (query?.all?.[2]) {
      return <TaskDetail />;
    } else {
      return <TasksList />;
    }
  };

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages['notification.title'] as string}
      sidebarContent={<TaskSideBar />}
    >
      <AppPageMeta title="Notifications" />
      {onGetMainComponent()}
    </AppsContainer>
  );
};

export default Notification;
