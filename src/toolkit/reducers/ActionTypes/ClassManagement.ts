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
  GET_TEACHER,
  GET_ALL_TEACHERS,
  ADD_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER,
  GET_ALL_CLASS_SCHEDULES,
  GET_CLASS_SCHEDULE,
  ADD_CLASS_SCHEDULE,
  UPDATE_CLASS_SCHEDULE,
  DELETE_CLASS_SCHEDULE,
  GET_ALL_EATING_SCHEDULES,
  GET_EATING_SCHEDULE,
  ADD_EATING_SCHEDULE,
  UPDATE_EATING_SCHEDULE,
  DELETE_EATING_SCHEDULE
} from '@/@crema/types/actions/ClassManagement.actions';

import { ClassDataType, ClassScheduleDataType, ClassStudentDataType, EatingScheduleDataType, TeacherDataType, TeacherProfileDataType } from '@/@crema/types/models/apps/ClassManagement';

export const GetAllClassesAction = createAction<ClassDataType[]>(GET_ALL_CLASSES);

export const AddClassAction = createAction<ClassDataType>(ADD_CLASS);

export const UpdateClassAction = createAction<ClassDataType>(UPDATE_CLASS);

export const DeleteClassAction = createAction<number>(DELETE_CLASS);

export const GetClassStudentsAction = createAction<{studentList: ClassStudentDataType[]; classId: number}>(GET_CLASS_STUDENTS);

export const GetStudentAction = createAction<any>(GET_STUDENT);

export const AddStudentAction = createAction<ClassStudentDataType>(ADD_STUDENT);

export const UpdateStudentAction = createAction<ClassStudentDataType>(UPDATE_STUDENT);

export const DeleteStudentAction = createAction<number>(DELETE_STUDENT);

export const GetAllTeachersAction = createAction<TeacherDataType[]>(GET_ALL_TEACHERS);

export const GetTeacherAction = createAction<TeacherProfileDataType>(GET_TEACHER);

export const AddTeacherAction = createAction<TeacherDataType>(ADD_TEACHER);

export const UpdateTeacherAction = createAction<TeacherDataType>(UPDATE_TEACHER);

export const DeleteTeacherAction = createAction<number>(DELETE_TEACHER);

export const GetAllClassSchedulesAction = createAction<{classScheduleList: ClassScheduleDataType[]; classId: number}>(GET_ALL_CLASS_SCHEDULES);

export const GetClassScheduleAction = createAction<ClassScheduleDataType>(GET_CLASS_SCHEDULE);

export const AddClassScheduleAction = createAction<ClassScheduleDataType>(ADD_CLASS_SCHEDULE);

export const UpdateClassScheduleAction = createAction<ClassScheduleDataType>(UPDATE_CLASS_SCHEDULE);

export const DeleteClassScheduleAction = createAction<number>(DELETE_CLASS_SCHEDULE);

export const GetAllEatingSchedulesAction = createAction<{eatingScheduleList: EatingScheduleDataType[]; classId: number}>(GET_ALL_EATING_SCHEDULES);

export const GetEatingScheduleAction = createAction<EatingScheduleDataType>(GET_EATING_SCHEDULE);

export const AddEatingScheduleAction = createAction<EatingScheduleDataType>(ADD_EATING_SCHEDULE);

export const UpdateEatingScheduleAction = createAction<EatingScheduleDataType>(UPDATE_EATING_SCHEDULE);

export const DeleteEatingScheduleAction = createAction<number>(DELETE_EATING_SCHEDULE);


