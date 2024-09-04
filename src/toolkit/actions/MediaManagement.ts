import { AppActions } from '@crema/types/actions';
import { Dispatch } from 'redux';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { statusCodes } from '@/@crema/services/api/constants';
import { ADD_NEW_MEDIA, DELETE_MEDIA, GET_ALL_MEDIA } from '@/@crema/types/actions/MediaManagement.actions';
import { getAllMedia, uploadMedia, deleteMedia } from '@/@crema/services/api/media';
import { MediaDataType } from '@/@crema/types/models/apps/MediaManagement';

export const getAllMediaData = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await getAllMedia();
      console.log(response);
      if (response.status === statusCodes.OK) {
        const mediaList: MediaDataType[] = response.data.map((media: any, index: any) => {
          return {
            id: media.id,
            name: media?.media_type,
            url: media?.url,
          }
        })
        dispatch({ type: GET_ALL_MEDIA, payload: mediaList });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError(response.data));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const addNewMediaData = (data: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await uploadMedia(data);
      if (response.status === statusCodes.CREATED) {
        const newMedia: MediaDataType = {
          id: response.data.id,
          name: response.data?.media_type,
          url: response.data?.url,
        }
        dispatch({ type: ADD_NEW_MEDIA, payload: newMedia });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError(response.data));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const deleteMediaData = (mediaId: number) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        try {
        const response = await deleteMedia(mediaId);
        if (response.status === statusCodes.OK) {
            dispatch({ type: DELETE_MEDIA, payload: mediaId });
            dispatch(fetchSuccess());
        } else {
            dispatch(fetchError(response.data));
        }
        } catch (error) {
        dispatch(fetchError(error.message));
        }
    };
}
