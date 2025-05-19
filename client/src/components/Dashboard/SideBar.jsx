import React from "react";

const Sidebar = ({ sidebarOpen, setSidebarOpen, setActiveTab, activeTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    setSidebarOpen={setSidebarOpen}
  };

  

  const tabs = [
    { name: "Home", icon: "🏠", id: "home" },
    { name: "Upload Files", icon: "📤", id: "upload" },
    { name: "Settings", icon: "⚙️", id: "settings" },
    { name: "Logout", icon: "🚪", id: "logout" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out z-40 w-64 bg-white shadow-lg md:translate-x-0 md:static md:inset-0`}
    >
      <div className="flex flex-col h-full">
        <div className="px-6 py-4 text-2xl font-bold border-b">Dashboard</div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 w-full ${
                activeTab === tab.id ? "bg-gray-200" : ""
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              <span className="text-lg font-medium">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
