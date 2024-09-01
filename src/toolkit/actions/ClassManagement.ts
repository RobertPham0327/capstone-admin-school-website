import { AppActions } from '@crema/types/actions';
import { Dispatch } from 'redux';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass,
  getAllStudent,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  addStudentToClass,
  getAllClassSchedules,
  createClassSchedule,
  updateClassSchedule,
  deleteClassSchedule,
  getAllTeachers,
  getTeacherProfile,
  addNewTeacher,
  updateTeacher,
  deleteTeacher,
} from '@crema/services/api/class';
import {
  ADD_CLASS,
  ADD_CLASS_SCHEDULE,
  ADD_STUDENT,
  ADD_TEACHER,
  DELETE_CLASS,
  DELETE_CLASS_SCHEDULE,
  DELETE_STUDENT,
  GET_ALL_CLASS_SCHEDULES,
  GET_ALL_CLASSES,
  GET_ALL_TEACHERS,
  GET_CLASS_STUDENTS,
  GET_STUDENT,
  GET_TEACHER,
  UPDATE_CLASS,
  UPDATE_CLASS_SCHEDULE,
  UPDATE_STUDENT,
  UPDATE_TEACHER,
} from '@crema/types/actions/ClassManagement.actions';
import {
  ClassDataType,
  ClassScheduleDataType,
  ClassStudentDataType,
  StudentProfileDataType,
  TeacherDataType,
  TeacherProfileDataType,
} from '@crema/types/models/apps/ClassManagement';
import {
  sampleClassList,
  sampleStudentList,
  sampleTeacher,
  sampleTeacherList,
} from '@/modules/apps/ClassManagement/mockData';
import { statusCodes } from '@/@crema/services/api/constants';
import teacher from '@/pages/apps/class-management/teacher';

export const getClassList = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    dispatch({ type: GET_ALL_CLASSES, payload: sampleClassList });
    dispatch(fetchSuccess());

    // try {
    //   const response = await getAllClasses();
    //   if (response.status === statusCodes.OK) {
    //     dispatch({ type: GET_ALL_CLASSES, payload: response.data });
    //     dispatch(fetchSuccess());
    //   } else {
    //     dispatch(fetchError('Something went wrong, Please try again!'));
    //   }
    // } catch (error) {
    //   dispatch(fetchError(error.message));
    // }
  };
};

export const createClassData = (classData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await createClass(classData);
      if (response.status === statusCodes.CREATED) {
        dispatch({ type: ADD_CLASS, payload: response.data });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const updateClassData = (classId: number, classData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await updateClass(classId, classData);
      console.log(response);
      if (response.status === statusCodes.OK) {
        dispatch({ type: UPDATE_CLASS, payload: response.data });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const deleteClassData = (classId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await deleteClass(classId);
      if (response.status === statusCodes.OK) {
        dispatch({ type: DELETE_CLASS, payload: classId });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const getClassStudentList = (classId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    dispatch({ type: GET_CLASS_STUDENTS, payload: { studentList: sampleStudentList, classId } });
    dispatch(fetchSuccess());

    // try {
    //   const response = await getAllStudent(classId);
    //   if (response.status === statusCodes.OK) {
    //     dispatch({ type: GET_CLASS_STUDENTS, payload: response.data });
    //     dispatch(fetchSuccess());
    //   } else {
    //     dispatch(fetchError('Something went wrong, Please try again!'));
    //   }
    // } catch (error) {
    //   dispatch(fetchError(error.message));
    // }
  };
};

export const getStudentData = (studentId: number, classId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchStart());
    // dispatch({ type: GET_STUDENT, payload: sampleStudent });
    // dispatch(fetchSuccess());

    dispatch(fetchStart());
    try {
      const response = await getStudent(studentId, classId);
      if (response.status === statusCodes.OK) {
        const studentData: StudentProfileDataType = {
          id: studentId,
          student_id: studentId,
          student_name: response.data?.studentProfile?.studentName,
          class_name: response.data?.className,
          gender: response.data?.studentProfile?.gender,
          date_of_birth: response.data?.studentProfile?.dateOfBirth,
          school_name: response.data?.studentProfile?.schoolName,
          parent_name: response.data?.studentProfile?.parentName,
          parent_phone: response.data?.studentProfile?.parentPhoneNumber,
          avatar_url: response.data?.studentProfile?.avatarUrl,
        };
        dispatch({ type: GET_STUDENT, payload: studentData });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const addStudentData = (classId: number, studentData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await createStudent(studentData);
      if (response.status === statusCodes.CREATED) {
        const res = await addStudentToClass(classId, response.data.id);
        if (res.status === statusCodes.CREATED) {
          const newStudent: ClassStudentDataType = {
            id: response.data.id,
            class_id: classId,
            student_id: response.data.id,
            name: response.data.name,
            date_of_birth: response.data.date_of_birth,
            gender: response.data.gender,
          };
          dispatch({ type: ADD_STUDENT, payload: newStudent });
          dispatch(fetchSuccess());
        } else {
          dispatch(fetchError('Failed to add student to class!'));
        }
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const updateStudentData = (studentId: number, classId: number, studentData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await updateStudent(studentId, classId, studentData);
      if (response.status === statusCodes.OK) {
        dispatch({ type: UPDATE_STUDENT, payload: response.data });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const deleteStudentData = (studentId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await deleteStudent(studentId);
      if (response.status === statusCodes.OK) {
        dispatch({ type: DELETE_STUDENT, payload: studentId });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const getAllTeacherData = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchStart());
    // dispatch({ type: GET_ALL_TEACHERS, payload: sampleTeacherList });
    // dispatch(fetchSuccess());

    try {
      const response = await getAllTeachers();
      if (response.status === statusCodes.OK) {
        const teacherList: TeacherDataType[] = response.data.map((teacher: any) => {
          return {
            id: teacher.id,
            name: teacher.name,
            gender: 'Male',
            contact: teacher.contact_number,
          };
        });
        dispatch({ type: GET_ALL_TEACHERS, payload: teacherList });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const getTeacherProfileData = (teacherId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchStart());
    // dispatch({ type: GET_TEACHER, payload: sampleTeacher });
    // dispatch(fetchSuccess());

    try {
      const response = await getTeacherProfile(teacherId);
      console.log(response);
      if (response.status === statusCodes.OK) {
        const teacherProfile: TeacherProfileDataType = {
          id: response.data.id,
          name: response.data.name,
          contact: response.data.contact_number,
          school_name: response.data.school_name,
          class_list: response.data.classes,
          avatar_url: response.data.profilePictureUrl,
        }
        dispatch({ type: GET_TEACHER, payload: teacherProfile });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const addTeacherData = (teacherData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await addNewTeacher(teacherData);
      console.log(response);
      if (response.status === statusCodes.CREATED) {
        const newTeacher: TeacherDataType = {
          id: response.data.id,
          name: response.data.name,
          contact: response.data.contact_number,
          gender: 'Male',
        }
        dispatch({ type: ADD_TEACHER, payload: newTeacher });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const updateTeacherData = (teacherId: number, teacherData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await updateTeacher(teacherId, teacherData);
      console.log(response);
      if (response.status === statusCodes.OK) {
        const updatedTeacher: TeacherDataType = {
          id: response.data.id,
          name: response.data.name,
          contact: response.data.contact_number,
          gender: "Male"
        }
        dispatch({ type: UPDATE_TEACHER, payload: updatedTeacher });
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));

      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  }
};

export const deleteTeacherData = (teacherId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await deleteTeacher(teacherId);
      if (response.status === statusCodes.OK) {
        dispatch({ type: DELETE_CLASS, payload: teacherId });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const getAllClassSchedulesData = (classId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await getAllClassSchedules(classId);
      if (response.status === statusCodes.OK) {
        const classScheduleList: ClassScheduleDataType[] = response.data.map((schedule: any) => {
          return {
            id: schedule.id,
            start: schedule.startTime?.split('.')[0],
            end: schedule.endTime?.split('.')[0],
            title: schedule.subjectName,
            class_id: schedule.classId,
            class_name: 'Class name',
            teacher_id: schedule.teacherId,
            teacher_name: 'Teacher name',
            location_id: schedule.locationId,
            location_name: 'Location name',
          };
        });
        // console.log(classScheduleList);
        dispatch({ type: GET_ALL_CLASS_SCHEDULES, payload: { classScheduleList: classScheduleList, classId } });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {}
  };
};

export const addClassScheduleData = (classId: number, scheduleData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await createClassSchedule(classId, scheduleData);
      console.log(response);
      if (response.status === statusCodes.CREATED) {
        dispatch({ type: ADD_CLASS_SCHEDULE, payload: response.data });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const updateClassScheduleData = (scheduleId: number, scheduleData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await updateClassSchedule(scheduleId, scheduleData);
      console.log(response);
      if (response.status === statusCodes.OK) {
        const updatedSchedule: ClassScheduleDataType = {
          id: response.data.id,
          start: response.data.start_time?.split('.')[0],
          end: response.data.end_time?.split('.')[0],
          title: 'Subject name',
          class_id: response.data.class_id,
          class_name: 'Class name',
          teacher_id: response.data.teacher_id,
          teacher_name: 'Teacher name',
          location_id: response.data.location_id,
          location_name: 'Location name',
        };
        dispatch({ type: UPDATE_CLASS_SCHEDULE, payload: updatedSchedule });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const deleteClassScheduleData = (scheduleId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await deleteClassSchedule(scheduleId);
      if (response.status === statusCodes.OK) {
        dispatch({ type: DELETE_CLASS_SCHEDULE, payload: scheduleId });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};
