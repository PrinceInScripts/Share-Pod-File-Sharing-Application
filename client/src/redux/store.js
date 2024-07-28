import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./slice/fileSlice.js";
const store=configureStore({
    reducer:{
      file:fileReducer
    },
    devTools:true
})

export default store;