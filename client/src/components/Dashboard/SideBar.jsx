import React from "react";

const Sidebar = ({ sidebarOpen, setSidebarOpen, setActiveTab, activeTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close on mobile
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
      } transition-transform duration-200 ease-in-out w-64 z-40 md:translate-x-0 md:static md:inset-0 bg-[var(--bg-color)] text-[var(--text-color)] shadow-lg py-20`}
    >
      <div className="flex flex-col mt-4 h-full border-r border-[var(--border-color)]">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-left w-full font-medium
                ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white"
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
