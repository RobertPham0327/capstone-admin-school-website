import { ADD_NEW_MEDIA, DELETE_MEDIA, GET_ALL_MEDIA, UPDATE_MEDIA } from '@/@crema/types/actions/MediaManagement.actions';
import { MediaDataType } from '@/@crema/types/models/apps/MediaManagement';
import { createAction } from '@reduxjs/toolkit';

export const GetAllMediaAction = createAction<MediaDataType[]>(GET_ALL_MEDIA);
export const AddNewMediaAction = createAction<MediaDataType>(ADD_NEW_MEDIA);
export const UpdateMediaAction = createAction<MediaDataType>(UPDATE_MEDIA);
export const DeleteMediaAction = createAction<number>(DELETE_MEDIA);
