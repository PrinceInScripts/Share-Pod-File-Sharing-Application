import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
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
    <>
      {/* 🌐 MOBILE HEADER */}
      <header className="w-full sm:hidden flex items-center justify-between px-4 py-3 border-b shadow-sm fixed top-0 left-0 z-50 bg-[var(--bg-color)] text-[var(--text-color)]">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-[var(--primary-text)]">PasteBox</span>
        </Link>
        <button onClick={() => setSidebarVisible(true)} className="focus:outline-none">
          <svg className="w-8 h-8 text-[var(--text-color)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* 📱 MOBILE SIDEBAR OVERLAY */}
      {sidebarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden" onClick={() => setSidebarVisible(false)}></div>
      )}

      {/* 📱 MOBILE SIDEBAR PANEL (RIGHT SLIDE) */}
      <aside className={`fixed top-0 right-0 w-64 h-full bg-[var(--bg-color)] text-[var(--text-color)] z-50 shadow-lg transform ${sidebarVisible ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 sm:hidden`}>
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
          </div>
          <button onClick={() => setSidebarVisible(false)} className="text-xl font-bold">×</button>
        </div>
        <div className="p-4 flex flex-col gap-4">
          {/* 🌙 Mode Toggle */}
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={mode === "dark"}
                onChange={() => setMode(mode === "light" ? "dark" : "light")}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${mode === "dark" ? "bg-[var(--primary-text)]" : "bg-gray-300"}`}></div>
              <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${mode === "dark" ? "translate-x-5" : ""}`}></div>
            </label>
          </div>

          {/* 🎨 Theme Picker */}
          <div>
            <p className="mb-2">Choose Theme</p>
            <div className="flex space-x-3">
              {Object.keys(colorMap).map((color) => (
                <button
                  key={color}
                  onClick={() => setTheme(color)}
                  className={`w-6 h-6 rounded-full ${colorMap[color]} border-2 ${theme === color ? "border-black" : "border-transparent"}`}
                ></button>
              ))}
            </div>
          </div>

          {/* 🔐 Auth Links */}
          <div className="flex flex-col gap-2 mt-4">
            <Link to="/signup" onClick={() => setSidebarVisible(false)} className="text-sm font-medium px-4 py-2 rounded bg-blue-500 text-white text-center">Sign Up</Link>
            <Link to="/login" onClick={() => setSidebarVisible(false)} className="text-sm font-medium px-4 py-2 rounded bg-purple-500 text-white text-center">Log In</Link>
          </div>
        </div>
      </aside>

      {/* 🖥 DESKTOP HEADER */}
      <header className="hidden sm:flex w-full items-center justify-between px-4 py-4 border-b shadow-sm fixed top-0 left-0 z-50 bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="hidden sm:flex flex-col text-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <span className="text-3xl font-bold text-[var(--primary-text)]">PasteBox</span>
              </Link>
              <span className="text-base text-[var(--secondary-text)]">File Sharing Made Easy</span>
            </div>
        <div className="flex items-center space-x-4">
          {/* 🌙 Mode Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={mode === "dark"}
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${mode === "dark" ? "bg-[var(--primary-text)]" : "bg-gray-300"}`}></div>
            <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${mode === "dark" ? "translate-x-5" : ""}`}></div>
          </label>

          {/* 🎨 Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="focus:outline-none"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/11460/11460836.png"
                alt="Theme Icon"
                className="w-10 h-10"
              />
            </button>
            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg p-3 z-50">
                <div className="flex space-x-2">
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

          {/* 🔐 Auth Buttons */}
          <Link to="/signup" className="text-sm font-medium px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-700 transition">Sign Up</Link>
          <Link to="/login" className="text-sm font-medium px-4 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-700 transition">Log In</Link>
        </div>
      </header>
    </>
  );
};

export default Header;
