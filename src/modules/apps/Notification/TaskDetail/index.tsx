import React, { useEffect } from 'react';
import TaskDetailHeader from './TaskDetailHeader';
import { useRouter } from 'next/router';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import { onGetSelectedTask } from '../../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';

const TaskDetail = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(({ todoApp }) => todoApp.selectedTask);

  const { query } = useRouter();
  const id = query?.all?.[query.all.length - 1];

  useEffect(() => {
    dispatch(onGetSelectedTask(Number(id)));
  }, [dispatch, id]);

  if (!selectedTask) {
    return null;
  }
  return (
    <>
      {/* <AppsHeader>
        <TaskDetailHeader selectedTask={selectedTask} />
      </AppsHeader> */}
      {/* <AppsContent isDetailView>
        <TaskDetailBody selectedTask={selectedTask} />
      </AppsContent> */}
    </>
  );
};

export default TaskDetail;
