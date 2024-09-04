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
  getAllEatingSchedules,
  createEatingSchedule,
  updateEatingSchedule,
} from '@crema/services/api/class';
import {
  ADD_CLASS,
  ADD_CLASS_SCHEDULE,
  ADD_EATING_SCHEDULE,
  ADD_STUDENT,
  ADD_TEACHER,
  DELETE_CLASS,
  DELETE_CLASS_SCHEDULE,
  DELETE_EATING_SCHEDULE,
  DELETE_STUDENT,
  GET_ALL_CLASS_SCHEDULES,
  GET_ALL_CLASSES,
  GET_ALL_EATING_SCHEDULES,
  GET_ALL_TEACHERS,
  GET_CLASS_STUDENTS,
  GET_EATING_SCHEDULE,
  GET_STUDENT,
  GET_TEACHER,
  UPDATE_CLASS,
  UPDATE_CLASS_SCHEDULE,
  UPDATE_EATING_SCHEDULE,
  UPDATE_STUDENT,
  UPDATE_TEACHER,
} from '@crema/types/actions/ClassManagement.actions';
import {
  ClassDataType,
  ClassScheduleDataType,
  ClassStudentDataType,
  EatingScheduleDataType,
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

export const getClassList = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchStart());
    // dispatch({ type: GET_ALL_CLASSES, payload: sampleClassList });
    // dispatch(fetchSuccess());

    try {
      const response = await getAllClasses();
      if (response.status === statusCodes.OK) {
        const classList: ClassDataType[] = response.data.map((classData: any) => {
          return {
            id: classData?.id,
            name: classData?.name,
            teacher_id: classData?.teacher_id,
            teacher_name: classData?.teacher_name,
            class_room: classData?.location_name,
            school_year: classData?.school_year,
          };
        })
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
    // dispatch(fetchStart());
    // dispatch({ type: GET_CLASS_STUDENTS, payload: { studentList: sampleStudentList, classId } });
    // dispatch(fetchSuccess());

    try {
      const response = await getAllStudent(classId);
      if (response.status === statusCodes.OK) {
        const studentList: ClassStudentDataType[] = response.data.map((student: any, index: any) => {
          return {
            id: student.id,
            class_id: classId,
            student_id: student.id,
            name: student?.name,
            date_of_birth: student?.date_of_birth,
            gender: student?.gender
          }
        })
        dispatch({ type: GET_CLASS_STUDENTS, payload:  { studentList: studentList, classId } });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
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
        const studentId = response.data?.id;
        const res = await addStudentToClass(studentId, classId);
        if (res.status === statusCodes.CREATED) {
          const newStudent: ClassStudentDataType = {
            id: response.data?.id,
            class_id: classId,
            student_id: response.data?.id,
            name: response.data?.name,
            date_of_birth: response.data?.date_of_birth,
            gender: response.data?.gender,
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
      console.log(response);
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
      if (response.status === statusCodes.OK) {
        const updatedTeacher: TeacherDataType = {
          id: response.data?.id,
          name: response.data?.name,
          contact: response.data?.contact_number,
          gender: "Male",
          avatar_url: response.data?.profilePictureUrl,
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


export const getAllEatingSchedulesData = (classId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await getAllEatingSchedules(classId);
      if (response.status === statusCodes.OK) {
        // const rawData = {
        //   '2024-08-16': {
        //     Breakfast: [
        //       {
        //         id: 17,
        //         class_id: 1,
        //         start_time: '2024-08-16T08:00:00.000Z',
        //         end_time: '2024-08-16T09:00:00.000Z',
        //         meal: 'Breakfast',
        //         menu: ['Chicken', 'Salad'],
        //         nutrition: ['Protein', 'carb'],
        //         location_id: 1,
        //         created_at: '2024-08-16T07:52:08.411Z',
        //         updated_at: '2024-08-16T07:52:08.411Z',
        //         media_id: null,
        //         media: [],
        //       },
        //       {
        //         id: 16,
        //         class_id: 1,
        //         start_time: '2024-08-16T08:00:00.000Z',
        //         end_time: '2024-08-16T09:00:00.000Z',
        //         meal: 'Breakfast',
        //         menu: ['Grilled Chicken', 'Yagourt'],
        //         nutrition: ['Vitamin A', 'Vitamin B'],
        //         location_id: 1,
        //         created_at: '2024-08-16T07:21:16.341Z',
        //         updated_at: '2024-08-19T03:18:19.693Z',
        //         media_id: null,
        //         media: [],
        //       },
        //     ],
        //   },
        // };
        const rawData = response.data;
        const eatingScheduleList: EatingScheduleDataType[] = Object.keys(rawData).map((date: string) => {
          const scheduleData = rawData[date];
          const mealList: EatingScheduleDataType[] = Object.keys(scheduleData).map((meal: string) => {
            const mealData = scheduleData[meal];
            return mealData.map((event: any) => {
              return {
                id: event.id,
                start: event.start_time?.split('.')[0],
                end: event.end_time?.split('.')[0],
                title: event.meal,
                class_id: event.class_id,
                class_name: 'Class name',
                location_id: event.location_id,
                location_name: 'Location name',
                nutrition: event.nutrition,
                menu: event.menu,
              };
            })
          });
          return mealList.flat();
        }).flat();
        console.log(eatingScheduleList);
        dispatch({ type: GET_ALL_EATING_SCHEDULES, payload: { eatingScheduleList: eatingScheduleList, classId } });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
}

export const addEatingScheduleData = (classId: number, scheduleData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await createEatingSchedule(classId, scheduleData);
      if (response.status === statusCodes.CREATED) {
        const newScheduleData: EatingScheduleDataType = {
          id: response.data.id,
          start: response.data.start_time?.split('.')[0],
          end: response.data.end_time?.split('.')[0],
          title: response.data?.meal,
          class_id: response.data?.class_id,
          class_name: 'Class name',
          location_id: response.data?.location_id,
          location_name: 'Location name',
          nutrition: response.data?.nutrition,
          menu: response.data?.menu,
        }
        dispatch({ type: ADD_EATING_SCHEDULE, payload: newScheduleData });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
}

export const updateEatingScheduleData = (scheduleId: number, scheduleData: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await updateEatingSchedule(scheduleId, scheduleData);
      console.log(response);
      if (response.status === statusCodes.OK) {
        const resData = response.data[0];
        const updatedSchedule: EatingScheduleDataType = {
          id: resData.id,
          start: resData.start_time?.split('.')[0],
          end: resData.end_time?.split('.')[0],
          title: resData?.meal,
          class_id: resData?.class_id,
          class_name: 'Class name',
          location_id: resData?.location_id,
          location_name: 'Location name',
          nutrition: resData?.nutrition,
          menu: resData?.menu,
        };
        console.log(updatedSchedule);
        dispatch({ type: UPDATE_EATING_SCHEDULE, payload: updatedSchedule });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
}

export const deleteEatingScheduleData = (scheduleId: number) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const response = await deleteClassSchedule(scheduleId);
      if (response.status === statusCodes.OK) {
        dispatch({ type: DELETE_EATING_SCHEDULE, payload: scheduleId });
        dispatch(fetchSuccess());
      } else {
        dispatch(fetchError('Something went wrong, Please try again!'));
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
}
