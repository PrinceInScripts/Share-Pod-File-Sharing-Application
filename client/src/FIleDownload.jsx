import { useState } from "react";
import axiosInstance from "./config/axiosInstance";

// pages/FileDownload.js
const FileDownload = () => {
  const { code } = useParams();
  const [fileData, setFileData] = useState(null);
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [error, setError] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosInstance.get(`files/resolveShareLink/${code}`);
        setFileData(res.data);
        if (res.data.isPasswordProtected) {
          setShowPasswordPrompt(true);
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Error');
      }
    };
    fetchDetails();
  }, [code]);

  const handlePasswordSubmit = async () => {
    try {
      await axiosInstance.post(`files/verifyFilePassword`, {
        fileId: fileData.fileId,
        password,
      });
      setShowPasswordPrompt(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Incorrect password');
    }
  };

  const handleDownload = async () => {
    try {
      const res = await axiosInstance.post(`files/download/${fileData.fileId}`, {
        password,
      });
      window.open(res.data.downloadUrl, '_blank');
    } catch (err) {
      setError(err.response?.data?.error || 'Download failed');
    }
  };

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}

      {fileData && (
        <>
          <h2>{fileData.name}</h2>
          <p>{(fileData.size / (1024 * 1024)).toFixed(2)} MB</p>

          {showPasswordPrompt ? (
            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handlePasswordSubmit}>Verify</button>
            </div>
          ) : (
            <button onClick={handleDownload}>Download</button>
          )}
        </>
      )}
    </div>
  );
};

export default FileDownload;    