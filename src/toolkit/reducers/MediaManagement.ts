import { createReducer } from '@reduxjs/toolkit';
import { MediaDataType } from '@/@crema/types/models/apps/MediaManagement';
import {
  AddNewMediaAction,
  GetAllMediaAction,
  DeleteMediaAction,
  UpdateMediaAction,
} from './ActionTypes/MediaManagement';

const initialState: {
  mediaList: MediaDataType[];
  photoList: MediaDataType[];
  videoList: MediaDataType[];
} = {
  mediaList: [],
  photoList: [],
  videoList: [],
};

const mediaManagementReducer = createReducer(initialState, builder => {
  builder
    .addCase(GetAllMediaAction, (state, action) => {
      state.mediaList = action.payload;
      state.photoList = action.payload.filter(media => media.type === 'image');
      state.videoList = action.payload.filter(media => media.type === 'video');
    })
    .addCase(AddNewMediaAction, (state, action) => {
      state.mediaList.push(action.payload);
      if (action.payload.type === 'image') {
        state.photoList.push(action.payload);
      }
      if (action.payload.type === 'video') {
        state.videoList.push(action.payload);
      }
    })
    .addCase(DeleteMediaAction, (state, action) => {
      state.mediaList = state.mediaList.filter(media => media.id !== action.payload);
    })
    .addCase(UpdateMediaAction, (state, action) => {
      state.mediaList = state.mediaList.map(media => (media.id === action.payload.id ? action.payload : media));
    });
});

export default mediaManagementReducer;
