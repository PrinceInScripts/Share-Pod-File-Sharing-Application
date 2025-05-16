// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser,updateUser,deleteUser } from './authThunk';
const stored = localStorage.getItem('user');
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: stored ? JSON.parse(stored) : null,
    isLoggedIn: !!stored,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
    loadUserFromStorage: (state) => {
      const stored = localStorage.getItem('user');
      if (stored) {
        state.user = JSON.parse(stored);
        state.isLoggedIn = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        
        state.user = action.payload.user;
        state.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);
        
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
        // updateUser
      .addCase(updateUser.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(updateUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        localStorage.setItem('user',JSON.stringify(action.payload));
      })
        .addCase(updateUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.error || 'Update failed';
        })
        // deleteUser
        .addCase(deleteUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=null;
            state.isLoggedIn=false;
            localStorage.removeItem('user');
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.error || 'Delete failed';
        })
     

  }
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
