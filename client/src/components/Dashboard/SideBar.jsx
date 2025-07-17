import React from "react";

const Sidebar = ({ sidebarOpen, setSidebarOpen, setActiveTab, activeTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Correct usage to close sidebar after click
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
      } transition-transform duration-200 ease-in-out z-40 w-64 shadow-lg md:translate-x-0 md:static md:inset-0 bg-[var(--bg-color)] text-[var(--text-color)]`}
    >
      <div className="flex flex-col h-full">
        <div className="px-6 py-4 text-2xl font-bold border-b border-[var(--border-color)]">
          Dashboard
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-left w-full font-medium
                ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white" // Active color
                    : "hover:bg-purple-100 hover:text-purple-800 transition"
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
