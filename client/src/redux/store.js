import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./slice/file/fileSlice.js";
import authReducer from "./slice/auth/authSlice.js";
const store=configureStore({
    reducer:{
      file:fileReducer,
      auth:authReducer
    },
    devTools:true
})

export default store;