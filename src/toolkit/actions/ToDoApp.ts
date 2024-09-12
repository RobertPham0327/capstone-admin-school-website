import {
  CREATE_NEW_TASK,
  GET_TASK_DETAIL,
  GET_TASK_LIST,
  GET_TODO_FOLDER_LIST,
  GET_TODO_LABEL_LIST,
  GET_TODO_PRIORITY_LIST,
  GET_TODO_STAFF_LIST,
  GET_TODO_STATUS_LIST,
  TOGGLE_TODO_DRAWER,
  UPDATE_TASK_DETAIL,
  UPDATE_TASK_FOLDER,
  UPDATE_TASK_LABEL,
  UPDATE_TASK_STARRED_STATUS,
} from '@crema/types/actions/Todo.action';
import { appIntl } from '@crema/helpers/Common';
import jwtAxios from '@crema/services/auth/jwt-auth';
import { fetchError, fetchStart, fetchSuccess, showMessage } from './Common';
import { Dispatch } from 'redux';
import { AppActions } from '@crema/types/actions';
import { TodoObjType } from '@crema/types/models/apps/Todo';

export const onGetTaskList = () => {
  const { messages } = appIntl();
  // const page = currentPage ? currentPage : null;
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/notification', {
      })
      .then((data: any) => {
        if (data.status === 200) {
          console.log(data.data);
          dispatch(fetchSuccess());
          dispatch({ type: GET_TASK_LIST, payload: data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const onToggleTodoDrawer = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: TOGGLE_TODO_DRAWER });
  };
};


export const onDeleteSelectedTasks = (taskIds: number[], type: string, name: string, page: number) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put('/api/todo/update/folder', { taskIds, type, name, page })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_TASK_FOLDER, payload: data.data });
          dispatch(showMessage(String(messages['task.deleted'])));
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const onCreateTask = (task: TodoObjType | any) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post('/notification', { ...task })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_NEW_TASK, payload: data });
          dispatch(showMessage(String(messages['task.created'])));
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};


