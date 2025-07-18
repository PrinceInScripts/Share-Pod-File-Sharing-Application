import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GuestDownload = () => {
  const { shortCode } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  // useEffect(() => {
  //   fetch(`http://localhost:6600/api/files/f/${shortCode}`)
  //     .then((res) => {
  //       if (!res.ok) throw new Error("File not found");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setFile(data);
  //       setIsProtected(data.isPasswordProtected);
  //       setIsLoading(false);

  //       if (data.isPasswordProtected) {
  //         toast.info("🔒 This file is password protected. Please enter the password.");
  //       }
  //     })
  //     .catch((err) => setError(err.message));
  // }, [shortCode]);
   useEffect(() => {
  const controller = new AbortController();

  const fetchFile = async () => {
    try {
      const res = await fetch(`http://localhost:6600/api/files/g/${shortCode}`, {
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("File not found");

      const data = await res.json();
      setFile(data);
      setIsProtected(data.isPasswordProtected);
      setIsLoading(false);

      if (data.isPasswordProtected) {
        toast.info("🔒 This file is password protected. Please enter the password.");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
  };

  fetchFile();

  // cleanup to cancel if component unmounts or re-renders
  return () => controller.abort();
}, [shortCode]);

  const handleDownload = () => {
  const link = document.createElement('a');
  link.href = file.downloadUrl;
  link.setAttribute('download', file.name); // optional; browser may ignore if headers are set
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};





  const verifyFile = async () => {
    if (!password) {
      toast.warn("Please enter a password.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:6600/api/files/verifyFilePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortCode, password }),
      });

      const result = await res.json();
      console.log(result);
      if (result.success) {
        toast.success("✅ Password verified! You can now download the file.");
        setIsVerified(true);
      } else {
        toast.error("❌ Incorrect password. Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (isLoading || !file) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="w-full max-w-screen-lg mx-auto bg-[var(--bg-color)] rounded shadow-md p-4 sm:p-6 flex flex-col gap-6 lg:flex-row">
      
      {/* Left Column */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <p className="text-[var(--text-color)] text-sm sm:text-base">
          <strong>File Name:</strong> {file.name}
        </p>
        <div className="w-full">
          <h2 className="text-lg font-semibold text-[var(--primary-text)] mb-2">File Preview</h2>

          {/* File Preview */}
          {file.type.startsWith("image/") && (
            <img src={file.path} alt={file.name} className="w-full h-auto rounded mb-4" />
          )}
          {file.type.startsWith("video/") && (
            <video controls className="w-full h-auto rounded mb-4">
              <source src={file.path} type={file.type} />
              Your browser does not support the video tag.
            </video>
          )}
          {file.type.startsWith("audio/") && (
            <audio controls className="w-full h-auto rounded mb-4">
              <source src={file.path} type={file.type} />
              Your browser does not support the audio element.
            </audio>
          )}
          {file.type === "application/pdf" && (
            <iframe src={file.path} title="PDF Preview" className="w-full h-[400px] rounded mb-4"></iframe>
          )}
        </div>
        <p className="text-[var(--text-color)] text-sm">
          <strong>Uploaded by:</strong> {file.uploadedBy}
        </p>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/3 flex flex-col gap-3 justify-start">
        <p className="text-[var(--text-color)] text-sm sm:text-base">
          <strong>Uploaded on:</strong> {new Date(file.createdAt).toLocaleDateString()}
        </p>
        <p className="text-[var(--text-color)] text-sm sm:text-base">
          <strong>File Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
        <p className="text-[var(--text-color)] text-sm sm:text-base">
          <strong>File Type:</strong> {file.type}
        </p>

        {/* Password Protected UI */}
        {isProtected && !isVerified && (
          <>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={verifyFile}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              🔐 Verify Password
            </button>
          </>
        )}

        {/* Download Button */}
        {(!isProtected || isVerified) && (
          <button
  onClick={handleDownload}
  className="mt-4 w-full bg-green-600 text-white text-center px-4 py-2 rounded hover:bg-green-700"
>
  ⬇️ Download
</button>

        )}
      </div>
    </div>
  );
};

export default GuestDownload;
