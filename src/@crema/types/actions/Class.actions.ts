import { TeacherDataType, FilterDataType, SchoolDataType, DailyScheduleDataType, EatingScheduleDataType,ClassStudentDataType, AbsenceDataType, ClassDataType,   } from '../models/class/Class';
export const ADD_CLASS_ITEM = 'ADD_CLASS_ITEM';
export const UPDATE_CLASS_ITEM = 'UPDATE_CLASS_ITEM';
export const REMOVE_CLASS_ITEM = 'REMOVE_CLASS_ITEM';
export const GET_CLASS_LIST = 'GET_CLASS_LIST';
export const SET_CLASS_DATA = 'SET_CLASS_DATA';
export const SET_FILTER_DATA = 'SET_FILTER_DATA';


export type GetClassAction =  {
    type: typeof GET_CLASS_LIST;
    payload: ClassDataType[];
};

export type SetClassDetailAction = {
    type: typeof SET_CLASS_DATA;
    payload: ClassDataType;
};

export type AddClassItemsAction = {
    type: typeof ADD_CLASS_ITEM;
    payload: ClassDataType;
};

export type UpdateClassItemsAction = {
    type: typeof UPDATE_CLASS_ITEM;
    payload: ClassDataType;
}

export type RemoveClassItemsAction = {
    type: typeof REMOVE_CLASS_ITEM;
    payload: ClassDataType;
};

export type SetFilterDataAction = {
    type: typeof SET_FILTER_DATA;
    payload: FilterDataType;
}


export type ClassActionTypes = 
    | GetClassAction
    | SetClassDetailAction
    | AddClassItemsAction
    | UpdateClassItemsAction
    | RemoveClassItemsAction
    | SetFilterDataAction;


