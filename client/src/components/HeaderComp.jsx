import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mode, setModeState] = useState("light");
  const [theme, setThemeState] = useState("pink");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "pink";
    const savedMode = localStorage.getItem("mode") || "light";
    setThemeState(savedTheme);
    setModeState(savedMode);
    document.body.setAttribute("data-theme", savedTheme);
    document.body.setAttribute("data-mode", savedMode);
  }, []);

  const setTheme = (newTheme) => {
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  };

  const setMode = (newMode) => {
    document.body.setAttribute("data-mode", newMode);
    localStorage.setItem("mode", newMode);
    setModeState(newMode);
  };

  const colorMap = {
  pink: "bg-pink-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
};

  return (
    <header className="w-full flex flex-wrap items-center justify-between px-4 py-4 border-b shadow-sm fixed top-0 left-0 z-50 bg-[var(--bg-color)] text-[var(--text-color)]">
      {/* Branding */}
      <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
        <h1 className="text-lg font-bold text-[var(--primary-text)]">SharePod</h1>
        <p className="text-xs text-gray-500 hidden md:block">A File Sharing Platform</p>
      </div>

      {/* Theme + User Actions */}
      <div className="flex items-center space-x-3 mt-2 sm:mt-0">
        {/* 🌞/🌙 Mode Toggle */}
       <div className="flex items-center space-x-2">
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={mode === "dark"}
      onChange={() => setMode(mode === "light" ? "dark" : "light")}
      className="sr-only peer"
    />
    <div
      className={`
        w-11 h-6 rounded-full 
        peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2
        transition-colors duration-300
        ${mode === "dark" ? "bg-[var(--primary-text)]" : "bg-gray-300"}
        peer-checked:bg-[var(--primary-text)]
        peer-checked:after:translate-x-full
      `}
    ></div>
    <div
      className={`
        absolute left-1 top-1 w-4 h-4 rounded-full bg-white 
        transition-transform duration-300
        ${mode === "dark" ? "translate-x-5" : ""}
      `}
    ></div>
  </label>
  {/* <span className="text-sm text-gray-700 dark:text-gray-200">
    {mode === "dark" ? "Dark Mode" : "Light Mode"}
  </span> */}
</div>


        {/* 🎨 Theme Selector */}
        <div className="relative">
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            aria-label="Theme settings"
            className="text-xl"
          >
            <img src="https://cdn-icons-png.flaticon.com/128/11460/11460836.png" alt="Theme Icon" className="w-10 h-10" />
          </button>
          {themeDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg p-3 z-50 min-w-[150px]">
              {/* Color Options */}
              <div className="flex space-x-2 mb-2">
  {Object.keys(colorMap).map((color) => (
    <button
      key={color}
      onClick={() => setTheme(color)}
      className={`w-5 h-5 rounded-full ${colorMap[color]}`}
      aria-label={`${color} theme`}
    />
  ))}
</div>
            </div>
          )}
        </div>

        {/* Auth Buttons */}
       <div className="flex items-center gap-3">
  <button className="text-sm font-medium px-4 py-2 rounded-full bg-blue-500 text-blue-100 hover:bg-blue-700 hover:text-white transition">
    Sign Up
  </button>
  <button className="text-sm font-medium px-4 py-2 rounded-full bg-purple-500 text-purple-100 hover:bg-purple-700 hover:text-white transition">
    Log In
  </button>
</div>

      </div>
    </header>
  );
};

export default Header;
