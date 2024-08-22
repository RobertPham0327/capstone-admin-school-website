import { ClassDataType, ClassStudentDataType, TeacherDataType } from '../models/apps/ClassManagement';

export const GET_ALL_CLASSES = 'GET_ALL_CLASSES';
export const ADD_CLASS = 'ADD_CLASS';
export const UPDATE_CLASS = 'UPDATE_CLASS';
export const DELETE_CLASS = 'DELETE_CLASS';
export const GET_CLASS_STUDENTS = 'GET_CLASS_STUDENTS';
export const GET_STUDENT = 'GET_STUDENT';
export const ADD_STUDENT = 'ADD_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const GET_TEACHER = 'GET_TEACHER';

export type GetAllClassesAction = {
  type: typeof GET_ALL_CLASSES;
  payload: ClassDataType[];
};

export type AddClassAction = {
  type: typeof ADD_CLASS;
  payload: ClassDataType;
};

export type UpdateClassAction = {
  type: typeof UPDATE_CLASS;
  payload: ClassDataType;
};

export type DeleteClassAction = {
  type: typeof DELETE_CLASS;
  payload: number;
};

export type GetClassStudentsAction = {
  type: typeof GET_CLASS_STUDENTS;
  payload: ClassStudentDataType[];
};

export type GetStudentAction = {
  type: typeof GET_STUDENT;
  payload: any;
};

export type AddStudentAction = {
  type: typeof ADD_STUDENT;
  payload: ClassStudentDataType;
};

export type UpdateStudentAction = {
  type: typeof UPDATE_STUDENT;
  payload: ClassStudentDataType;
};

export type DeleteStudentAction = {
  type: typeof DELETE_STUDENT;
  payload: number;
};

export type GetTeacherAction = {
  type: typeof GET_TEACHER;
  payload: TeacherDataType;
};

export type ClassManagementActions =
  | GetAllClassesAction
  | AddClassAction
  | UpdateClassAction
  | DeleteClassAction
  | GetClassStudentsAction
  | GetStudentAction
  | AddStudentAction
  | UpdateStudentAction
  | DeleteStudentAction
  | GetTeacherAction;
