import { createAction } from '@reduxjs/toolkit';
import {
  ADD_CLASS,
  GET_ALL_CLASSES,
  UPDATE_CLASS,
  DELETE_CLASS,
  GET_CLASS_STUDENTS,
  GET_STUDENT,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  GET_TEACHER
} from '@/@crema/types/actions/ClassManagement.actions';

import { ClassDataType, ClassStudentDataType, TeacherDataType } from '@/@crema/types/models/apps/ClassManagement';

export const GetAllClassesAction = createAction<ClassDataType[]>(GET_ALL_CLASSES);

export const AddClassAction = createAction<ClassDataType>(ADD_CLASS);

export const UpdateClassAction = createAction<ClassDataType>(UPDATE_CLASS);

export const DeleteClassAction = createAction<number>(DELETE_CLASS);

export const GetClassStudentsAction = createAction<ClassStudentDataType[]>(GET_CLASS_STUDENTS);

export const GetStudentAction = createAction<any>(GET_STUDENT);

export const AddStudentAction = createAction<ClassStudentDataType>(ADD_STUDENT);

export const UpdateStudentAction = createAction<ClassStudentDataType>(UPDATE_STUDENT);

export const DeleteStudentAction = createAction<number>(DELETE_STUDENT);

export const GetTeacherAction = createAction<TeacherDataType>(GET_TEACHER);
