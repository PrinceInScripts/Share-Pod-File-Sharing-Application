// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../../config/axiosInstance';

// REGISTER
export const registerUser = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/users/register', formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message || 'Registration failed');
  }
});

// LOGIN
export const loginUser = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/users/login', formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message || 'Login failed');
  }
});


// updateUser
export const updateUser = createAsyncThunk('auth/updateUser', async ({ userId, formData }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/user/${userId}`, formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// deleteUser
export const deleteUser = createAsyncThunk('auth/deleteUser', async (userId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/user/${userId}`);
    return userId;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

//getUser
export const getUser = createAsyncThunk('auth/getUser', async (userId, { rejectWithValue }) => {
  try {
    console.log(userId);
    
    const res = await axiosInstance.get(`users/user/${userId}`);
    console.log(res);
    
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});





