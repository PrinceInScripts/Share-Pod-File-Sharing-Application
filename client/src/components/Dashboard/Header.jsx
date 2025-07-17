import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "pink";
    const savedMode = localStorage.getItem("mode") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    document.body.setAttribute("data-mode", savedMode);
  }, []);

  const setTheme = (theme) => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const setMode = (mode) => {
    document.body.setAttribute("data-mode", mode);
    localStorage.setItem("mode", mode);
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-5 border-b shadow-sm fixed top-0 left-0 z-50 bg-[var(--bg-color)] text-[var(--text-color)]">
      {/* Hamburger Menu */}
      <button
        className="focus:outline-none md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Branding */}
      <div className="hidden sm:flex flex-col text-center">
        <h1 className="text-lg font-bold text-[var(--primary-text)]">SharePod</h1>
        <p className="text-xs text-gray-500 hidden md:block">A File Sharing Plateform</p>
      </div>

      {/* Search Bar */}
     

      {/* Theme + User Profile */}
      <div className="flex items-center space-x-4">
        {/* 🎨 Theme Dropdown */}
        <div className="relative">
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            aria-label="Theme settings"
            className="text-xl"
          >
            🎨
          </button>
          {themeDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg p-3 z-50 min-w-[150px]">
              {/* Color Themes */}
              <div className="flex space-x-2 mb-2">
                {["pink", "blue", "green", "purple"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setTheme(color)}
                    className={`w-5 h-5 rounded-full bg-${color}-500`}
                    aria-label={`${color} theme`}
                  />
                ))}
              </div>
              {/* Mode Toggle */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setMode("light")}
                  className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  ☀️ Light
                </button>
                <button
                  onClick={() => setMode("dark")}
                  className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  🌙 Dark
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center space-x-2 cursor-pointer" tabIndex={0} role="button">
          <div className="w-9 h-9 rounded-full bg-[var(--primary-text)] flex items-center justify-center text-white font-bold">
            {user?.fullname?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="hidden md:block">
            <h3 className="text-sm font-medium">{user?.fullname || "User"}</h3>
            <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
