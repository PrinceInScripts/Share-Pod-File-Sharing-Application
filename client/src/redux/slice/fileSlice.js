import { createSlice } from '@reduxjs/toolkit';
import { uploadFile } from './fileThunk';

const initialState = {
  downloadContent: 0,
  data: {},
  path:"",
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
    setPath:(state,action)=>{
       state.path=action.payload
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
        state.data = action.payload.data;
        state.path=action.payload.path
        state.downloadContent = action.payload.data.downloadedContent;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUploadProgress, setEstimatedTime ,setPath} = fileSlice.actions;
export default fileSlice.reducer;