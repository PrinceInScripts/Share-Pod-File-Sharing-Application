import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import StatsGrid from "./StatesGrid";
import UserProfile from "./UserProfile";
import UploadPage from "./FileUpload/UploadPage";
import FileShow from "./FileShow";
import Logout from "./Logout";
import Footer from "../Footer";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <h1 className="text-3xl font-bold text-gray-700 animate-pulse">Loading...</h1>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen}  setSidebarOpen={setSidebarOpen} setActiveTab={setActiveTab} activeTab={activeTab}/>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="flex flex-col flex-1">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 mt-20">
          {activeTab === "upload" && <UploadPage />}
          {activeTab === "profile" && <UserProfile />}
          {activeTab === "settings" && <UserProfile />}
          {activeTab === "logout" && <Logout />}
          {activeTab === "home" && 

           <>
          <h2 className="text-2xl font-bold text mb-4">Dashboard Overview</h2>
          <StatsGrid />
          <FileShow />
         </>
           }
           
        </main>
        
      </div>
      
    </div>
    <Footer/>
    </>
    
  );
};

export default Dashboard;
