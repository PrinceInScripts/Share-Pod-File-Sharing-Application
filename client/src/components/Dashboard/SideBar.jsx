import React, { useState } from "react";

const Sidebar = ({ sidebarOpen }) =>{
      const [isHome, setIsHome] = useState(true);
      const [isUpload, setIsUpload] = useState(false);
      const [isSettings, setIsSettings] = useState(false);
      const [isLogout, setIsLogout] = useState(false);
      const [isFilePreview, setIsFilePreview] = useState(false);

      

  return (
    <div
    className={`fixed inset-y-0 left-0 transform ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-200 ease-in-out z-40 w-64 bg-white shadow-lg md:translate-x-0 md:static md:inset-0`}
  >
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 text-2xl font-bold border-b">Dashboard</div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        <a onClick={
          () => {
            setIsHome(true);
            setIsUpload(false);
            setIsSettings(false);
            setIsLogout(false);
          }
        } href="#" className="block px-4 py-2 rounded hover:bg-gray-200">Home</a>
        <a onClick={
          () => {
            setIsHome(false);
            setIsUpload(true);
            setIsSettings(false);
            setIsLogout(false);
          }
        } href="#" className="block px-4 py-2 rounded hover:bg-gray-200">Upload Files</a>
        <a onClick={
          () => {
            setIsHome(false);
            setIsUpload(false);
            setIsSettings(true);
            setIsLogout(false);
          }
        } href="#" className="block px-4 py-2 rounded hover:bg-gray-200">Settings</a>
        <a onClick={
          () => {
            setIsHome(false);
            setIsUpload(false);
            setIsSettings(false);
            setIsLogout(true);
          }
        } href="#" className="block px-4 py-2 rounded hover:bg-gray-200">Logout</a>
      </nav>
    </div>
  </div>
  )
}

export default Sidebar;
