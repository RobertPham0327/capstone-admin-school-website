import { createAction } from '@reduxjs/toolkit';
import {
  ADD_CLASS_ITEM,
  UPDATE_CLASS_ITEM,
  REMOVE_CLASS_ITEM,
  GET_CLASS_LIST,
  SET_CLASS_DATA,
  SET_FILTER_DATA,
} from '@crema/types/actions/Class.actions';

import {
  ClassDataType,
  TeacherDataType,
  SchoolDataType,
  DailyScheduleDataType,
  EatingScheduleDataType,
  ClassStudentDataType,
  AbsenceDataType,
  FilterDataType,
} from '@crema/types/models/class/Class';

export const GetClassListAction = createAction<{
  list: ClassDataType[];
  total: number;
}>(GET_CLASS_LIST);

export const SetFilterDataAction = createAction<FilterDataType>(SET_FILTER_DATA);

export const SetClassDataAction = createAction<ClassDataType>(SET_CLASS_DATA);

export const AddClassDatAction = createAction<{
  list: ClassDataType[];
  total: number;
}>(ADD_CLASS_ITEM);

export const UpdateClassDataAction = createAction<{
  list: ClassDataType[];
  total: number;
}>(UPDATE_CLASS_ITEM);

export const RemoveClassDataAction = createAction<ClassDataType>(REMOVE_CLASS_ITEM);
