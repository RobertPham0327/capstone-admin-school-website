import { ClassDataType, ClassStudentDataType, TeacherDataType } from '@crema/types/models/apps/ClassManagement';
import { createReducer } from '@reduxjs/toolkit';
import {
  AddClassAction,
  AddStudentAction,
  DeleteClassAction,
  DeleteStudentAction,
  GetAllClassesAction,
  GetClassStudentsAction,
  GetStudentAction,
  GetTeacherAction,
  UpdateClassAction,
  UpdateStudentAction,
} from './ActionTypes/ClassManagement';

const initialState: {
  classList: ClassDataType[];
  currentClass: any | null;
  currentStudentList: ClassStudentDataType[];
  currentTeacher: TeacherDataType | null;
  currentStudent: any | null;
} = {
  classList: [],
  currentClass: null,
  currentStudentList: [],
  currentTeacher: null,
  currentStudent: null,
};

const classManagementReducer = createReducer(initialState, builder => {
  builder
    .addCase(GetAllClassesAction, (state, action) => {
      state.classList = action.payload;
    })
    .addCase(AddClassAction, (state, action) => {
      state.classList.push(action.payload);
    })
    .addCase(UpdateClassAction, (state, action) => {
      state.classList = state.classList.map(item => (item.id === action.payload.id ? action.payload : item));
    })
    .addCase(DeleteClassAction, (state, action) => {
      state.classList = state.classList.filter(item => item.id !== action.payload);
    })
    .addCase(GetClassStudentsAction, (state, action) => {
      state.currentStudentList = action.payload;
      state.currentClass = state.classList.find(item => item.id === action.payload[0].class_id) || null
    })
    .addCase(GetStudentAction, (state, action) => {
      state.currentStudent = action.payload;
    })
    .addCase(AddStudentAction, (state, action) => {
      state.currentStudentList.push(action.payload);
    })
    .addCase(UpdateStudentAction, (state, action) => {
      state.currentStudentList = state.currentStudentList.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    })
    .addCase(DeleteStudentAction, (state, action) => {
      state.currentStudentList = state.currentStudentList.filter(item => item.id !== action.payload);
    })
    .addCase(GetTeacherAction, (state, action) => {
      state.currentTeacher = action.payload;
    })
});

export default classManagementReducer;
