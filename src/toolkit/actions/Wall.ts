import { CREATE_NEW_POST, GET_FEED_POSTS, GET_WALL_DATA, UPDATE_POST } from '@crema/types/actions/Wall.actions';
import jwtAxios from '@crema/services/auth/jwt-auth';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { Dispatch } from 'redux';
import { AppActions } from '@crema/types/actions';
import { appIntl } from '@crema/helpers/Common';
import { CommentObjType, PostObjType } from '@crema/types/models/apps/Wall';
import { Form } from 'antd';

export const onGetWallData = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/post/all-posts')
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_WALL_DATA, payload: data.data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetPostsList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/post/all-posts')
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_FEED_POSTS, payload: data.data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

// export const onCreateNewPost = (post: PostObjType) => {
//   const { messages } = appIntl();

//   return (dispatch: Dispatch<any>) => {
//     console.log('post in actions', post);
//     dispatch(fetchStart());
//     jwtAxios
//       .post('/post/draft', {
//         media: post.media,
//         title: post.title,
//         content: post.content,
//         school_id: post.school_id,
//         created_by: post.created_by,
//         status: post.status,
//         // published_at: post.published_at,
//       })
//       .then(response => {
//         if (response.status === 200) {
//           dispatch(fetchSuccess());
//           dispatch({
//             type: CREATE_NEW_POST,
//             payload: response.data, // Process the data from the API response
//           });
//         } else {
//           dispatch(fetchError(String(messages['message.somethingWentWrong'])));
//         }
//       })
//       .catch(error => {
//         dispatch(fetchError(error.message));
//       });
//   };
// };

export const onCreateNewPost = (post: FormData) => {
  const { messages } = appIntl();

  return (dispatch: Dispatch<any>) => {
    dispatch(fetchStart());

    jwtAxios
      .post('/post/draft', post)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: CREATE_NEW_POST,
            payload: response.data,
          });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch(error => {
        dispatch(fetchError(error.message));
      });
  };
}

export const onUpdatePostStatus = (postId: number, status: boolean) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put('/wall/posts', { postId, status })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_POST,
            payload: data.data,
          });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};


