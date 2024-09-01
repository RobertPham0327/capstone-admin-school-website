import {
  ClassDataType,
  ClassScheduleDataType,
  ClassStudentDataType,
  EatingScheduleDataType,
  StudentProfileDataType,
  TeacherDataType,
  TeacherProfileDataType,
} from '../models/apps/ClassManagement';

// Class actions
export const GET_ALL_CLASSES = 'GET_ALL_CLASSES';
export const ADD_CLASS = 'ADD_CLASS';
export const UPDATE_CLASS = 'UPDATE_CLASS';
export const DELETE_CLASS = 'DELETE_CLASS';
export const GET_CLASS_STUDENTS = 'GET_CLASS_STUDENTS';

// Student actions
export const GET_STUDENT = 'GET_STUDENT';
export const ADD_STUDENT = 'ADD_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';

// Teacher actions
export const GET_ALL_TEACHERS = 'GET_ALL_TEACHERS';
export const GET_TEACHER = 'GET_TEACHER';
export const ADD_TEACHER = 'ADD_TEACHER';
export const UPDATE_TEACHER = 'UPDATE_TEACHER';
export const DELETE_TEACHER = 'DELETE_TEACHER';

// Class schedule actions
export const GET_ALL_CLASS_SCHEDULES = 'GET_ALL_CLASS_SCHEDULES';
export const GET_CLASS_SCHEDULE = 'GET_CLASS_SCHEDULE';
export const ADD_CLASS_SCHEDULE = 'ADD_CLASS_SCHEDULE';
export const UPDATE_CLASS_SCHEDULE = 'UPDATE_CLASS_SCHEDULE';
export const DELETE_CLASS_SCHEDULE = 'DELETE_CLASS_SCHEDULE';

// Eating schedule actions
export const GET_ALL_EATING_SCHEDULES = 'GET_ALL_EATING_SCHEDULES';
export const GET_EATING_SCHEDULE = 'GET_EATING_SCHEDULE';
export const ADD_EATING_SCHEDULE = 'ADD_EATING_SCHEDULE';
export const UPDATE_EATING_SCHEDULE = 'UPDATE_EATING_SCHEDULE';
export const DELETE_EATING_SCHEDULE = 'DELETE_EATING_SCHEDULE';

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
  payload: { studentList: ClassStudentDataType[]; classId: number };
};

export type GetStudentAction = {
  type: typeof GET_STUDENT;
  payload: StudentProfileDataType;
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

export type GetAllTeachersAction = {
  type: typeof GET_ALL_TEACHERS;
  payload: TeacherDataType[];
};

export type GetTeacherAction = {
  type: typeof GET_TEACHER;
  payload: TeacherProfileDataType;
};

export type AddTeacherAction = {
  type: typeof ADD_TEACHER;
  payload: TeacherDataType;
};

export type UpdateTeacherAction = {
  type: typeof UPDATE_TEACHER;
  payload: TeacherDataType;
};

export type DeleteTeacherAction = {
  type: typeof DELETE_TEACHER;
  payload: number;
};

export type GetAllClassSchedulesAction = {
  type: typeof GET_ALL_CLASS_SCHEDULES;
  payload: {classScheduleList: ClassScheduleDataType[]; classId: number};
}

export type GetClassScheduleAction = {
  type: typeof GET_CLASS_SCHEDULE;
  payload: ClassScheduleDataType;
}

export type AddClassScheduleAction = {
  type: typeof ADD_CLASS_SCHEDULE;
  payload: ClassScheduleDataType;
}

export type UpdateClassScheduleAction = {
  type: typeof UPDATE_CLASS_SCHEDULE;
  payload: ClassScheduleDataType;
}

export type DeleteClassScheduleAction = {
  type: typeof DELETE_CLASS_SCHEDULE;
  payload: number;
}

export type GetAllEatingSchedulesAction = {
  type: typeof GET_ALL_EATING_SCHEDULES;
  payload: EatingScheduleDataType[];
}

export type GetEatingScheduleAction = {
  type: typeof GET_EATING_SCHEDULE;
  payload: EatingScheduleDataType;
}

export type AddEatingScheduleAction = {
  type: typeof ADD_EATING_SCHEDULE;
  payload: EatingScheduleDataType;
}

export type UpdateEatingScheduleAction = {
  type: typeof UPDATE_EATING_SCHEDULE;
  payload: EatingScheduleDataType;
}

export type DeleteEatingScheduleAction = {
  type: typeof DELETE_EATING_SCHEDULE;
  payload: number;
}

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
  | GetTeacherAction
  | GetAllTeachersAction
  | AddTeacherAction
  | UpdateTeacherAction
  | DeleteTeacherAction
  | GetAllClassSchedulesAction
  | GetClassScheduleAction
  | AddClassScheduleAction
  | UpdateClassScheduleAction
  | DeleteClassScheduleAction
  | GetAllEatingSchedulesAction
  | GetEatingScheduleAction
  | AddEatingScheduleAction
  | UpdateEatingScheduleAction
  | DeleteEatingScheduleAction;
