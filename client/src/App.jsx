import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Home from "./Home/Home";
import FileUpload from "./components/FileUpload";
import { Route, Routes } from "react-router-dom";
import FilePreview from "./components/FilePreview";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/preview" element={<FilePreview />} />
      </Routes>
    </>
  );
}

export default App;
