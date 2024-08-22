import { ClassDataType, ClassStudentDataType } from '@/@crema/types/models/apps/ClassManagement';
import axios from '@crema/services/axios';
import { statusCodes } from './constants';
import { headers } from 'next/dist/client/components/headers';

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
    if (response.status === statusCodes.NO_CONTENT) {
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
    }
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

export const addStudentToClass = async (classId: number, studentId: number) => {
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
    const response = await axios.put(`/class/${classId}/student/${studentId}`, data);
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

export const deleteStudent = async (studentId: number, classId: number) => {
  try {
    const response = await axios.delete(`/class/${classId}/student/${studentId}`);
    if (response.status === statusCodes.NO_CONTENT) {
      return { status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status };
    }
    console.error(error);
  }
};
