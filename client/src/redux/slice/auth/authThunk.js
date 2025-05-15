// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// REGISTER
export const registerUser = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post('/register', formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
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
