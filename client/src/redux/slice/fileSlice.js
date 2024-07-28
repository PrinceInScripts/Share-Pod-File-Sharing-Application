// import { createSlice } from '@reduxjs/toolkit';
// import { uploadFile } from './fileThunk';

// const initialState = {
//   downloadContent: 0,
//   data: {},
//   path:"",
//   loading: false,
//   error: null,
//   uploadProgress: 0,
//   estimatedTime: null,
// };

// const fileSlice = createSlice({
//   name: 'file',
//   initialState,
//   reducers: {
//     setUploadProgress: (state, action) => {
//       state.uploadProgress = action.payload;
//     },
//     setEstimatedTime: (state, action) => {
//       state.estimatedTime = action.payload;
//     },
//     setPath:(state,action)=>{
//        state.path=action.payload
//     },
    
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadFile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(uploadFile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload.data;
//         state.path=action.payload.path
//         state.downloadContent = action.payload.data.downloadedContent;
//       })
//       .addCase(uploadFile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setUploadProgress, setEstimatedTime ,setPath} = fileSlice.actions;
// export default fileSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { uploadFile } from './fileThunk';

// // Retrieve data and path from local storage if they exist
// const localData = localStorage.getItem('data');
// const localPath = localStorage.getItem('path');

// const initialState = {
//   downloadContent: localData ? JSON.parse(localData).downloadedContent : 0,
//   data: localData ? JSON.parse(localData) : {},
//   path: localPath || "",
//   loading: false,
//   error: null,
//   uploadProgress: 0,
//   estimatedTime: null,
// };

// const fileSlice = createSlice({
//   name: 'file',
//   initialState,
//   reducers: {
//     setUploadProgress: (state, action) => {
//       state.uploadProgress = action.payload;
//     },
//     setEstimatedTime: (state, action) => {
//       state.estimatedTime = action.payload;
//     },
//     setPath: (state, action) => {
//       state.path = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadFile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(uploadFile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload.data;
//         state.path = action.payload.path;
//         state.downloadContent = action.payload.data.downloadedContent;

//         // Save data and path to local storage
//         localStorage.setItem('data', JSON.stringify(action.payload.data));
//         localStorage.setItem('path', action.payload.path);
//       })
//       .addCase(uploadFile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setUploadProgress, setEstimatedTime, setPath } = fileSlice.actions;
// export default fileSlice.reducer;

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