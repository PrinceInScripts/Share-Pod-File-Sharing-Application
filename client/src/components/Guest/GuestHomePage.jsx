import Header from "../HeaderComp";
import GuestFilePreview from "./GuestFilePreview";
import GuestFileUpload from "./GuestFileUpload";


const GuestHomePage = () => {
  return (
   <div className="min-h-screen flex bg-[var(--primary-bg)] text-[var(--text-color)]">
          <Header />
            <main className="flex-1 p-6 mt-10 max-w-screen-lg bg-[var(--primary-bg)] text-[var(--text-color)] mx-auto">
            <GuestFileUpload />
            <h2 className="text-2xl font-bold text-[var(--primary-text)] mb-4 mt-8">File Preview</h2>
            <p className="text-gray-700 mb-4">Here you can preview your files.</p>
            <GuestFilePreview />
            </main>

          </div>
  );
}

export default GuestHomePage;