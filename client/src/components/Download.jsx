import DownloadPage from "./DownloadPage";
import Header from "./HeaderComp";


const Download = () => {
    
    return (
        <>
          <div className="min-h-screen flex bg-[var(--primary-bg)] text-[var(--text-color)]">
          <Header />
            <main className="flex-1 p-6 mt-20 max-w-screen-lg bg-[var(--primary-bg)] text-[var(--text-color)] mx-auto">
            <h2 className="text-2xl font-bold text-[var(--primary-text)] mb-4">Download Page</h2>
            <p className="text-gray-700 mb-4">Here you can download your files.</p>
            <DownloadPage />
            </main>

          </div>
        </>
    );
};
export default Download;