// import axios from '@crema/services/axios';
import axios from '../auth/jwt-auth';
import { statusCodes } from './constants';

export const getAllMedia = async () => {
  try {
    const response = await axios.get('/media');
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

export const uploadMedia = async (data: any) => {
  try {
    const mediaData = new FormData();
    const fileList = data?.files?.fileList.map((file: any) => file.originFileObj);
    mediaData.append('files', fileList[0]);
    const response = await axios.post('/media/upload', mediaData, {
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

export const deleteMedia = async (mediaId: number) => {
    try {
        const response = await axios.delete(`/media/${mediaId}`);
        if (response.status === statusCodes.OK) {
        return { data: response.data, status: response.status };
        }
    } catch (error) {
        if (error.response) {
        return { data: error.response.data, status: error.response.status };
        }
        console.error(error);
    }
}
