import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../redux/slice/fileThunk';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload =async () => {
    if (file) {
      const response=await dispatch(uploadFile(file));
      console.log(response)
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? 'Uploading...' : 'Upload File'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {data && <p className="text-green-500 mt-2">File uploaded successfully!</p>}
    </div>
  );
};

export default FileUpload;