import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../config/axiosInstance';
import { setEstimatedTime, setUploadProgress } from './fileSlice';

export const uploadFile = createAsyncThunk('file/upload', async (fileData, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('file', fileData);

    const response = await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const progress = Math.round((loaded * 100) / total);
        thunkAPI.dispatch(setUploadProgress(progress));
        const startTime = new Date().getTime();
        const remainingTime = ((total - loaded) / (loaded / (new Date().getTime() - startTime))) / 1000; // in seconds
        thunkAPI.dispatch(setEstimatedTime(remainingTime.toFixed(2)));
      }
    });

    const { data } = response;
    localStorage.setItem('data', JSON.stringify(data.data));
    localStorage.setItem('downloadContent', data.data.downloadedContent);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const downloadFile = createAsyncThunk('file/download', async (fileId, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/file/${fileId}`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file'); // Change the filename as needed
    document.body.appendChild(link);
    link.click();

    const fileData = JSON.parse(localStorage.getItem('data'));
    fileData.downloadedContent += 1;
    localStorage.setItem('data', JSON.stringify(fileData));
    localStorage.setItem('downloadContent', fileData.downloadedContent);

    return fileData;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});