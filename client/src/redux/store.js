import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./slice/fileSlice.js";
const store=configureStore({
    reducer:{
      auth:fileReducer
    },
    devTools:true
})

export default store;