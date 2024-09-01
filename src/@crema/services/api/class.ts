import { ClassDataType, ClassStudentDataType } from '@/@crema/types/models/apps/ClassManagement';
import axios from '@crema/services/axios';
import { statusCodes } from './constants';

export const getAllClasses = async () => {
  try {
    const response = await axios.get('/class');
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
    const response = await axios.post('/class/create', data);
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
    const response = await axios.put(`/class/${classId}`, data);
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

export const getAllStudent = async (classId: number) => {
  try {
    const response = await axios.get(`/class/${classId}/students`);
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
    };
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
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
    // if (data.avatar.fileList[0] > 0) {
    //   formData.append('avatar', data.avatar.fileList[0].originFileObj);
    // }
    const response = await axios.put(`/students/${studentId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
    const response = await axios.get(`/schedule/all-schedules`);
    if (response.status === statusCodes.OK) {
      const classSchedules = response.data.filter((schedule: any) => schedule.classId === classId);
      return { data: classSchedules, status: response.status };
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
      formData.append('profilePicture', data.avatar.fileList[0].originFileObj);
    }
    const response = await axios.put(`/teacher/${teacherId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === statusCodes.OK) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
}

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
}

export const createClassSchedule = async (classId: number, data: any) => {
  try {
    const response = await axios.post('/schedule/create', data);
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
    const response = await axios.put(`/schedule/${scheduleId}`, data);
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
    const response = await axios.get(`/eating-schedule/${classId}`);
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
    const response = await axios.post('/eating-schedule/create', data);
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
    const response = await axios.put(`/eating-schedule/${scheduleId}`, data);
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
