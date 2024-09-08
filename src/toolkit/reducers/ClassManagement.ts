import {
  ClassDataType,
  ClassProfileDataType,
  ClassScheduleDataType,
  ClassStudentDataType,
  EatingScheduleDataType,
  LocationDataType,
  StudentProfileDataType,
  SubjectDataType,
  TeacherDataType,
  TeacherProfileDataType,
} from '@crema/types/models/apps/ClassManagement';
import { createReducer } from '@reduxjs/toolkit';
import {
  AddClassAction,
  AddClassScheduleAction,
  AddEatingScheduleAction,
  AddStudentAction,
  AddTeacherAction,
  DeleteClassAction,
  DeleteClassScheduleAction,
  DeleteEatingScheduleAction,
  DeleteStudentAction,
  DeleteTeacherAction,
  GetAllClassesAction,
  GetAllClassSchedulesAction,
  GetAllEatingSchedulesAction,
  GetAllLocationsAction,
  GetAllSubjectsAction,
  GetAllTeachersAction,
  GetClassProfileAction,
  GetClassScheduleAction,
  GetEatingScheduleAction,
  GetStudentAction,
  GetTeacherAction,
  UpdateClassAction,
  UpdateClassScheduleAction,
  UpdateEatingScheduleAction,
  UpdateStudentAction,
  UpdateTeacherAction,
} from './ActionTypes/ClassManagement';

const initialState: {
  classList: ClassDataType[];
  currentClass: ClassProfileDataType | null;
  teacherList: TeacherDataType[];
  currentTeacher: TeacherProfileDataType | null;
  currentStudent: StudentProfileDataType | null;
  classScheduleList: ClassScheduleDataType[];
  currentClassSchedule: ClassScheduleDataType | null;
  eatingScheduleList: EatingScheduleDataType[];
  currentEatingSchedule: EatingScheduleDataType;
  locationList: LocationDataType[];
  subjectList: SubjectDataType[];
} = {
  classList: [],
  currentClass: null,
  teacherList: [],
  currentTeacher: null,
  currentStudent: null,
  classScheduleList: [],
  currentClassSchedule: null,
  eatingScheduleList: [],
  currentEatingSchedule: null,
  locationList: [],
  subjectList: [],
};

const classManagementReducer = createReducer(initialState, builder => {
  builder
    .addCase(GetAllClassesAction, (state, action) => {
      const classListData = action.payload.map((classData: any, index: any) => {
        return {
          ...classData,
          index: index + 1,
        };
      });
      state.classList = classListData;
    })
    .addCase(AddClassAction, (state, action) => {
      const newClass = {
        ...action.payload,
        index: state.classList.length + 1,
      };
      state.classList.push(newClass);
    })
    .addCase(UpdateClassAction, (state, action) => {
      state.classList = state.classList.map(item => (item.id === action.payload.id ? action.payload : item));
    })
    .addCase(DeleteClassAction, (state, action) => {
      state.classList = state.classList.filter(item => item.id !== action.payload);
    })
    .addCase(GetClassProfileAction, (state, action) => {
      const studentListData = action.payload.student_list.map((student: any, index: any) => {
        return {
          ...student,
          index: index + 1,
        };
      });
      state.currentClass = {
        ...action.payload,
        student_list: studentListData,
      };
    })
    .addCase(GetStudentAction, (state, action) => {
      state.currentStudent = action.payload;
    })
    .addCase(AddStudentAction, (state, action) => {
      const newStudent = {
        ...action.payload,
        index: state.currentClass.student_list.length + 1,
      };
      state.currentClass.student_list.push(newStudent);
    })
    .addCase(UpdateStudentAction, (state, action) => {
      state.currentClass.student_list = state.currentClass.student_list.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    })
    .addCase(DeleteStudentAction, (state, action) => {
      state.currentClass.student_list = state.currentClass.student_list.filter(item => item.id !== action.payload);
    })
    .addCase(GetTeacherAction, (state, action) => {
      state.currentTeacher = action.payload;
    })
    .addCase(GetAllTeachersAction, (state, action) => {
      const teacherListData = action.payload.map((teacher: any, index: any) => {
        return {
          ...teacher,
          index: index + 1,
        };
      });
      state.teacherList = teacherListData;
    })
    .addCase(AddTeacherAction, (state, action) => {
      const newTeacher = {
        ...action.payload,
        index: state.teacherList.length + 1,
      };
      state.teacherList.push(newTeacher);
    })
    .addCase(UpdateTeacherAction, (state, action) => {
      state.teacherList = state.teacherList.map(item => (item.id === action.payload.id ? action.payload : item));
    })
    .addCase(DeleteTeacherAction, (state, action) => {
      state.teacherList = state.teacherList.filter(item => item.id !== action.payload);
    })
    .addCase(GetAllClassSchedulesAction, (state, action) => {
      state.classScheduleList = action.payload?.classScheduleList;
    })
    .addCase(GetClassScheduleAction, (state, action) => {
      state.currentClassSchedule = action.payload;
    })
    .addCase(AddClassScheduleAction, (state, action) => {
      state.classScheduleList.push(action.payload);
    })
    .addCase(UpdateClassScheduleAction, (state, action) => {
      state.classScheduleList = state.classScheduleList.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    })
    .addCase(DeleteClassScheduleAction, (state, action) => {
      state.classScheduleList = state.classScheduleList.filter(item => item.id !== action.payload);
    })
    .addCase(GetAllEatingSchedulesAction, (state, action) => {
      state.eatingScheduleList = action.payload?.eatingScheduleList;
    })
    .addCase(GetEatingScheduleAction, (state, action) => {
      state.currentEatingSchedule = action.payload;
    })
    .addCase(AddEatingScheduleAction, (state, action) => {
      state.eatingScheduleList.push(action.payload);
    })
    .addCase(UpdateEatingScheduleAction, (state, action) => {
      state.eatingScheduleList = state.eatingScheduleList.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    })
    .addCase(DeleteEatingScheduleAction, (state, action) => {
      state.eatingScheduleList = state.eatingScheduleList.filter(item => item.id !== action.payload);
    })
    .addCase(GetAllLocationsAction, (state, action) => {
      state.locationList = action.payload;
    })
    .addCase(GetAllSubjectsAction, (state, action) => {
      state.subjectList = action.payload;
    });
});

export default classManagementReducer;
