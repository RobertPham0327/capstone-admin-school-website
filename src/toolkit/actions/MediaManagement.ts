import { AppActions } from '@crema/types/actions';
import { Dispatch } from 'redux';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { statusCodes } from '@/@crema/services/api/constants';
import { ADD_NEW_MEDIA, DELETE_MEDIA, GET_ALL_MEDIA } from '@/@crema/types/actions/MediaManagement.actions';
import { getAllMedia, uploadMedia, deleteMedia } from '@/@crema/services/api/media';
import { MediaDataType } from '@/@crema/types/models/apps/MediaManagement';
import { url } from 'inspector';

const getImageSize = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
};

// Function to format the photo list
const getFormattedPhotos = async (photoList: any) => {
  const formattedList = await Promise.all(
    photoList.map(async (photo: any) => {
      try {
        const size = await getImageSize(photo.url);
        return {
          id: photo.id,
          type: photo?.media_type?.split('/')[0],
          url: photo?.url,
          width: size.width,
          height: size.height,
        };
      } catch (error) {
        console.error(`Error loading image at ${photo.url}:`, error);
        return {
          id: photo.id,
          type: photo?.media_type?.split('/')[0],
          url: photo?.url,
          width: 1,
          height: 1,
        };
      }
    }),
  );
  return formattedList;
};

export const getAllMediaData = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await getAllMedia();
      console.log(response);
      if (response.status === statusCodes.OK) {
        // const mediaList: MediaDataType[] = response.data.map((media: any, index: any) => {
        //   return {
        //     id: media.id,
        //     type: media?.media_type.split('/')[0],
        //     url: media?.url,
        //   }
        // })
        const mediaList: MediaDataType[] = await getFormattedPhotos(response.data);
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
        if (response.data?.media_type?.split('/')[0] === 'image') {
          const size = await getImageSize(response.data.url);
          const newPhoto: MediaDataType = {
            id: response.data.id,
            type: response.data?.media_type?.split('/')[0],
            url: response.data?.url,
            width: size.width,
            height: size.height,
          };
          console.log(newPhoto);
          dispatch({ type: ADD_NEW_MEDIA, payload: newPhoto });
        } else if (response.data?.media_type?.split('/')[0] === 'video') {
          const newVideo: MediaDataType = {
            id: response.data.id,
            type: response.data?.media_type?.split('/')[0],
            url: response.data?.url,
          };
          console.log(newVideo);
          dispatch({ type: ADD_NEW_MEDIA, payload: newVideo });
        }
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
};
