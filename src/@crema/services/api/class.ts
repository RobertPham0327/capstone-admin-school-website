import { ClassDataType, ClassStudentDataType } from '@/@crema/types/models/apps/ClassManagement';
// import axios from '@crema/services/axios';
import { statusCodes } from './constants';
import { getIOStringDate } from '@/@crema/helpers/DateHelper';
import axios from '../auth/jwt-auth';
import teacher from '@/pages/apps/class-management/teacher';

export const getAllClasses = async () => {
  try {
    const response = await axios.get('/class');
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const createClass = async (data: any) => {
  try {
    const newClassData = {
      name: data?.name,
      teacherId: data?.teacherId,
      locationId: data?.locationId,
      schoolYear: data?.schoolYear,
    };
    const response = await axios.post('/class/create', newClassData);
    console.log(response);
    if (response.status === statusCodes.CREATED) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const updateClass = async (classId: number, data: any) => {
  try {
    const newClassData = {
      name: data?.name,
      teacherId: data?.teacherId,
      locationId: data?.locationId,
      schoolYear: data?.schoolYear,
    };
    const response = await axios.put(`/class/${classId}`, newClassData);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const deleteClass = async (classId: number) => {
  try {
    const response = await axios.delete(`/class/${classId}`);
    if (response.status === statusCodes.OK) {
      return { status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};

export const getClassProfile = async (classId: number) => {
  try {
    const response = await axios.get(`/class/${classId}`);
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const getStudent = async (studentId: number, classId: number) => {
  try {
    const response = await axios.get(`/class/${classId}/students/${studentId}/profile`);
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const createStudent = async (data: any) => {
  try {
    const form = {
      studentName: data?.studentName,
      dateOfBirth: data?.dateOfBirth,
      gender: data?.gender,
      parentName: data?.parentName,
      parentPhone: data?.parentPhone,
      files: data?.files?.fileList,
    };
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (key === 'files') {
        if (form?.files?.length > 0) {
          formData.append('files', form.files[0].originFileObj);
        }
      } else {
        formData.append(key, form[key]);
      }
    });
    console.log(formData);
    const response = await axios.post(`/students/enroll`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    if (response.status === statusCodes.CREATED) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const addStudentToClass = async (studentId: number, classId: number) => {
  try {
    const response = await axios.post(`/class/${classId}`, { studentId });
    console.log(response);
    if (response.status === statusCodes.CREATED) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const updateStudent = async (studentId: number, classId: number, data: any) => {
  try {
    const formData = new FormData();
    formData.append('studentName', data.studentName);
    formData.append('parentName', data.parentName);
    formData.append('parentPhone', data.parentPhone);
    if (data?.avatar?.fileList.length > 0) {
      formData.append('avatar', data.avatar.fileList[0].originFileObj);
    }
    const response = await axios.put(`/students/${studentId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const deleteStudent = async (studentId: number) => {
  try {
    const response = await axios.delete(`/students/${studentId}`);
    if (response.status === statusCodes.OK) {
      return { status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};

export const getAllTeachers = async () => {
  try {
    const response = await axios.get('/teacher/all-teachers');
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};

export const getTeacherProfile = async (teacherId: number) => {
  try {
    const response = await axios.get(`/teacher/${teacherId}/profile`);
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};

export const getAllClassSchedules = async (classId: number) => {
  try {
    const response = await axios.get(`/schedule/${classId}`);
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const addNewTeacher = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('contact_number', data.contact);
    if (data?.avatar?.fileList.length > 0) {
      formData.append('profilePicture', data.avatar.fileList[0].originFileObj);
    }
    const response = await axios.post('/teacher/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === statusCodes.CREATED) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};

export const updateTeacher = async (teacherId: number, data: any) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('contact_number', data.contact);
    if (data?.avatar?.fileList.length > 0) {
      console.log(data.avatar.fileList[0].originFileObj);
      formData.append('profilePicture', data.avatar.fileList[0].originFileObj);
    }
    const response = await axios.put(`/teacher/${teacherId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};

export const deleteTeacher = async (teacherId: number) => {
  try {
    const response = await axios.delete(`/teacher/${teacherId}`);
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};

export const createClassSchedule = async (classId: number, data: any) => {
  try {
    const newScheduleData = {
      class_id: classId,
      subject_id: data.subject_id,
      teacher_id: data.teacher_id,
      location_id: data.location_id,
      start_time: data.start_time,
      end_time: data.end_time,
    };
    const response = await axios.post('/schedule/create', newScheduleData);
    console.log(response);
    if (response.status === statusCodes.CREATED) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const updateClassSchedule = async (scheduleId: number, data: any) => {
  try {
    const newScheduleData = {
      subject_id: data.subject_id,
      teacher_id: data.teacher_id,
      location_id: data.location_id,
      start_time: data.start_time,
      end_time: data.end_time,
    };
    const response = await axios.put(`/schedule/${scheduleId}`, newScheduleData);
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const deleteClassSchedule = async (scheduleId: number) => {
  try {
    const response = await axios.delete(`/schedule/${scheduleId}`);
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};

export const getAllEatingSchedules = async (classId: number) => {
  try {
    const response = await axios.get(`/eating-schedule/weekly/${classId}`);
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const createEatingSchedule = async (classId: number, data: any) => {
  try {
    const newScheduleData = {
      class_id: classId,
      location_id: data?.location,
      start_time: data?.start,
      end_time: data?.end,
      meal: data?.meal,
      menu: data?.menu,
      nutrition: data?.nutrition,
      files: data?.image?.fileList,
    };

    console.log('New Schedule:', newScheduleData);

    const formData = new FormData();

    Object.keys(newScheduleData).forEach(key => {
      if (key === 'nutrition' || key === 'menu') {
        newScheduleData[key].forEach((item: any) => {
          formData.append(key, item);
        });
      } else if (key === 'files') {
        if (newScheduleData?.files?.length > 0) {
          formData.append('files', newScheduleData.files[0].originFileObj);
        }
      } else {
        formData.append(key, newScheduleData[key]);
      }
    });

    const response = await axios.post('/eating-schedule/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    if (response.status === statusCodes.CREATED) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const updateEatingSchedule = async (scheduleId: number, data: any) => {
  try {
    const updateData = {
      location_id: data?.location,
      start_time: getIOStringDate(data.start),
      end_time: getIOStringDate(data.end),
      meal: data?.meal,
      menu: data?.menu,
      nutrition: data?.nutrition,
      files: data?.files?.fileList,
    };

    console.log('Update Schedule:', updateData);

    const formData = new FormData();

    Object.keys(updateData).forEach(key => {
      if (key === 'nutrition' || key === 'menu') {
        updateData[key].forEach((item: any) => {
          formData.append(key, item);
        });
      } else if (key === 'files') {
        if (updateData?.files?.length > 0) {
          formData.append('files', updateData.files[0].originFileObj);
        }
      } else {
        formData.append(key, updateData[key]);
      }
    });

    const response = await axios.put(`/eating-schedule/${scheduleId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
    console.error(error);
  }
};

export const deleteEatingSchedule = async (scheduleId: number) => {
  try {
    const response = await axios.delete(`/eating-schedule/${scheduleId}`);
    if (response.status === statusCodes.OK) {
      return { status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};

export const getAllLocations = async () => {
  try {
    const response = await axios.get('/location');
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};

export const getAllSubjects = async () => {
  try {
    const response = await axios.get('/subject');
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};
