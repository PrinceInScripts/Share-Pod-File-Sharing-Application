import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Home from "./Home/Home";
import FileUpload from "./components/FileUpload";
import { Route, Routes } from "react-router-dom";
import FilePreview from "./components/FilePreview";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/preview" element={<FilePreview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
