import { MediaDataType } from "../models/apps/MediaManagement";

export const GET_ALL_MEDIA = 'GET_ALL_MEDIA';
export const ADD_NEW_MEDIA = 'ADD_NEW_MEDIA';
export const DELETE_MEDIA = 'DELETE_MEDIA';
export const UPDATE_MEDIA = 'UPDATE_MEDIA';

export type GetAllMediaAction = {
    type: typeof GET_ALL_MEDIA;
    payload: MediaDataType[];
}

export type AddNewMediaAction = {
    type: typeof ADD_NEW_MEDIA;
    payload: MediaDataType;
}

export type DeleteMediaAction = {
    type: typeof DELETE_MEDIA;
    payload: number;
}

export type UpdateMediaAction = {
    type: typeof UPDATE_MEDIA;
    payload: MediaDataType;
}


export type MediaManagementActions = GetAllMediaAction | AddNewMediaAction | DeleteMediaAction | UpdateMediaAction;
