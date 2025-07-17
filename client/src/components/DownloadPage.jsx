import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DownloadPage = () => {
  const { shortCode } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:6600/api/files/f/${shortCode}`)
      .then((res) => {
        console.log("Response status:", res);
        if (!res.ok) throw new Error("File not found");
        return res.json();
      })
      .then((data) => setFile(data))
      .catch((err) => setError(err.message));
  }, [shortCode]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!file) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Download File</h2>
      <p><strong>File Name:</strong> {file.name}</p>
      <p><strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
      <a
        href={file.path}
        download
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download
      </a>
    </div>
  );
};

export default DownloadPage;
