import { useEffect, useState } from "react";
import Header from "../HeaderComp";
import GuestFilePreview from "./GuestFilePreview";
import GuestFileUpload from "./GuestFileUpload";
import Footer from "../Footer";


const GuestHomePage = () => {
    // This component serves as the main page for guest users to upload and preview files
    // take files from local storage and display them
   const [files, setFiles] = useState([]);

useEffect(() => {
  const storedFiles = JSON.parse(localStorage.getItem("guestFiles")) || [];
  setFiles(storedFiles);
}, []);
 const updateFiles = (newFiles) => {
    setFiles(newFiles);
    localStorage.setItem("guestFiles", JSON.stringify(newFiles));
  };

  return (
   <div className="min-h-screen flex-1 bg-[var(--primary-bg)] text-[var(--text-color)]">
          <Header />
            <main className="flex-1 p-6 mt-10 max-w-screen-xl bg-[var(--primary-bg)] text-[var(--text-color)] mx-auto">
            <GuestFileUpload guestFiles={files} updateFiles={updateFiles}/>
        
            <GuestFilePreview guestFiles={files} />
            
            </main>
            <Footer />
            

          </div>
  );
}

export default GuestHomePage;