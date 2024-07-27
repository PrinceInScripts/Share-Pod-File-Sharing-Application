import { createSlice } from '@reduxjs/toolkit';
import { uploadFile, downloadFile } from './fileThunk';

const initialState = {
  downloadContent: Number(localStorage.getItem('downloadContent')) || 0,
  data: JSON.parse(localStorage.getItem('data')) || {},
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.downloadContent = action.payload.data.downloadedContent;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(downloadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.downloadContent = action.payload.downloadedContent;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fileSlice.reducer;