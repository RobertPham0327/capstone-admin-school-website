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
} from '@crema/services/api/class';
import {
  ADD_CLASS,
  ADD_STUDENT,
  DELETE_CLASS,
  DELETE_STUDENT,
  GET_ALL_CLASSES,
  GET_CLASS_STUDENTS,
  GET_STUDENT,
  GET_TEACHER,
  UPDATE_CLASS,
  UPDATE_STUDENT,
} from '@crema/types/actions/ClassManagement.actions';
import {
  ClassDataType,
  ClassStudentDataType,
  sampleClassList,
  sampleStudent,
  sampleStudentList1,
  sampleStudentList2,
  sampleStudentList3,
  sampleTeacher1,
} from '@crema/types/models/apps/ClassManagement';

export const getClassList = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchStart());
    // dispatch({ type: GET_ALL_CLASSES, payload: sampleClassList });
    // dispatch(fetchSuccess());

    try {
      const response = await getAllClasses();
      if (response.status === 200) {
        const classList = response.data.map((classData: any) => {
          return {
            ...classData,
          }
        });
        dispatch({ type: GET_ALL_CLASSES, payload: classList });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const createClassData = (classData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await createClass(classData);
      if (response.status === 201) {
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
      if (response.status === 200) {
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
      if (response.status === 200) {
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
    // dispatch(fetchStart());

    // dispatch({ type: GET_CLASS_STUDENTS, payload: sampleStudentList1 });
    // dispatch(fetchSuccess());

    try {
      const response = await getAllStudent(classId);
      if (response.status === 200) {
        const studentList = response.data.map((student: any) => {
          return {
            ...student,
            class_id: classId,
          }
        })
        dispatch({ type: GET_CLASS_STUDENTS, payload: studentList });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const getStudentData = (classId: number, studentId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchStart());
    // dispatch({ type: GET_STUDENT, payload: sampleStudent });
    // dispatch(fetchSuccess());

    dispatch(fetchStart());
    try {
      const response = await getStudent(classId, studentId);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        const studentData = {
          name: response.data?.studentProfile?.studentName,
          className: response.data?.className,
          gender: response.data?.studentProfile?.gender,
          dateOfBirth: response.data?.studentProfile?.dateOfBirth,
          schoolName: response.data?.studentProfile?.schoolName,
          parentName: response.data?.studentProfile?.parentName,
          parentPhone: response.data?.studentProfile?.parentPhoneNumber,
          avatarUrl: response.data?.studentProfile?.avatarUrl,
        }
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
      if (response.status === 201) {
        const res = await addStudentToClass(classId, response.data.id);
        if (res.status === 201) {
          const newStudent = {
            class_id: classId,
            id: response.data.id,
            student_id: response.data.id,
            name: response.data.name,
            date_of_birth: response.data.date_of_birth,
            gender: response.data.gender
          }
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
      if (response.status === 200) {
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

export const deleteStudentData = (classId: number, studentId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await deleteStudent(studentId, classId);
      if (response.status === 200) {
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

export const getTeacherData = (teacherId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    dispatch({ type: GET_TEACHER, payload: sampleTeacher1});
    dispatch(fetchSuccess());

    // try {
    //   const response = await getTeacher(teacherId);
    //   if (response.status === 200) {
    //     dispatch({ type: GET_TEACHER, payload: response.data });
    //     dispatch(fetchSuccess());
    //   } else {
    //     dispatch(fetchError('Something went wrong, Please try again!'));
    //   }
    // } catch (error) {
    //   dispatch(fetchError(error.message));
    // }
  };
}
