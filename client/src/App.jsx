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
import RequireAuth from "./components/Auth/RequireAuth";
import NoRequireAuth from "./components/Auth/NotRequireAuth";
import DownloadPage from "./components/DownloadPage";

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
         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/f/:code" element={<FileDownload />} /> */}
        </Route>

        {/* Non-auth-only Routes */}
        <Route element={<NoRequireAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
           <Route path="/f/:shortCode" element={<DownloadPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
