import { createSlice } from '@reduxjs/toolkit';
import { uploadFile } from './fileThunk';

const initialState = {
  downloadContent: 0,
  files: JSON.parse(localStorage.getItem('files')) || [],
  loading: false,
  error: null,
  uploadProgress: 0,
  estimatedTime: null,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    setEstimatedTime: (state, action) => {
      state.estimatedTime = action.payload;
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter((file, index) => index !== action.payload);
      localStorage.setItem('files', JSON.stringify(state.files));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.push({ data: action.payload.data, path: action.payload.path });
        localStorage.setItem('files', JSON.stringify(state.files));
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUploadProgress, setEstimatedTime, deleteFile } = fileSlice.actions;
export default fileSlice.reducer;