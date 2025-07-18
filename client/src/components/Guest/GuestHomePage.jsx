import { useEffect, useState } from "react";
import Header from "../HeaderComp";
import GuestFilePreview from "./GuestFilePreview";
import GuestFileUpload from "./GuestFileUpload";


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
   <div className="min-h-screen flex bg-[var(--primary-bg)] text-[var(--text-color)]">
          <Header />
            <main className="flex-1 p-6 mt-10 max-w-screen-lg bg-[var(--primary-bg)] text-[var(--text-color)] mx-auto">
            <GuestFileUpload guestFiles={files} updateFiles={updateFiles}/>
            <h2 className="text-2xl font-bold text-[var(--primary-text)] mb-4 mt-8">File Preview</h2>
            <p className="text-gray-700 mb-4">Here you can preview your files.</p>
            <GuestFilePreview guestFiles={files} />
            </main>

          </div>
  );
}

export default GuestHomePage;