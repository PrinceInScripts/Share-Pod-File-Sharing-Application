import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Home/Home";
import FileUpload from "./components/FleUpload";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
      <FileUpload />
    </>
  );
}

export default App;
