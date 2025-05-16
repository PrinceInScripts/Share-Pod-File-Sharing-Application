// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../../config/axiosInstance';

// REGISTER
export const registerUser = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/users/register', formData);
    console.log(res);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message || 'Registration failed');
  }
});

// LOGIN
export const loginUser = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post('/login', formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});


// updateUser
export const updateUser = createAsyncThunk('auth/updateUser', async ({ userId, formData }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`/user/${userId}`, formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// deleteUser
export const deleteUser = createAsyncThunk('auth/deleteUser', async (userId, { rejectWithValue }) => {
  try {
    await axios.delete(`/user/${userId}`);
    return userId;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
