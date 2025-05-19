import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Home from "./Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import FileDownload from "./FIleDownload";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/slice/auth/authSlice";

function App() {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/f/:code" element={<FileDownload />} />
      </Routes>
    </>
  );
}

export default App;
