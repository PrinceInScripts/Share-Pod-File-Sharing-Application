import React, { useState } from "react";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl("");
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    // Simulate upload process
    alert(`File "${file.name}" uploaded successfully!`);
    setFile(null);
    setPreviewUrl("");
  };

  return (
    <div className="max-w-xl p-6 mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload File</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Choose a file
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
        />
      </div>

      {previewUrl && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Preview:</p>
          <img
            src={previewUrl}
            alt="Preview"
            className="w-48 h-48 object-cover rounded border"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadPage;
