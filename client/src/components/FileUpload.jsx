// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useDropzone } from 'react-dropzone';
// import { uploadFile } from '../redux/slice/fileThunk';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { setPath } from '../redux/slice/fileSlice';
// import { useNavigate } from 'react-router-dom';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const dispatch = useDispatch();
//   const navigate=useNavigate()
//   const { loading, error, data, uploadProgress, estimatedTime } = useSelector((state) => state.file);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       'image/*': [],
//       'video/*': [],
//       'application/pdf': []
//     },
//     maxSize: 1024 * 1024 * 1024, // 1GB max size
//     onDrop: (acceptedFiles) => {
//       setFile(acceptedFiles[0]);
//     },
//   });

//   const handleUpload = async () => {
//     if (file) {

//       const response = await dispatch(uploadFile(file));
//       console.log(response.payload.path)
//       console.log(response.payload)

//       if (response.error) {
//         toast.error('File upload failed!');
//       } else {
//         toast.success('File uploaded successfully!');
//         navigate("/file-preview")
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold mb-2">Upload Your File</h2>
//           <p className="text-gray-600">Accepted file types: jpg, jpeg, png, mp4, avi, mov, mkv, pdf. Max size: 1GB</p>
//         </div>
//         <div {...getRootProps()} className={`border-2 border-dashed p-6 text-center rounded-lg cursor-pointer ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}>
//           <input {...getInputProps()} />
//           {file ? (
//             <p className="text-green-500">{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</p>
//           ) : (
//             <p className="text-gray-500">Drag 'n' drop a file here, or click to select a file</p>
//           )}
//         </div>
//         <button onClick={handleUpload} disabled={loading} className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//           {loading ? 'Uploading...' : 'Upload File'}
//         </button>
//         {loading && (
//           <div className="mt-4 w-full bg-gray-200 rounded-full">
//             <div className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${uploadProgress}%` }}>
//               {uploadProgress}%
//             </div>
//             <p className="text-gray-600 mt-2">{estimatedTime ? `Estimated time remaining: ${estimatedTime} seconds` : ''}</p>
//           </div>
//         )}
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default FileUpload;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../redux/slice/fileThunk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "./HeaderComp";
import Footer from "./Footer";
import { SiSharex } from "react-icons/si";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, uploadProgress, estimatedTime } = useSelector(
    (state) => state.file
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
      "application/pdf": [],
    },
    maxSize: 1024 * 1024 * 1024, // 1GB max size
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async () => {
    if (file) {
      const response = await dispatch(uploadFile(file));
      if (response.error) {
        toast.error("File upload failed!");
      } else {
        navigate("/preview");
        toast.success("File uploaded successfully!");
      }
    }
  };

  return (
    <div className=" flex flex-col justify-between h-screen">
       <header className="bg-gray-100 py-4 px-20 flex justify-between items-center">
    <div className="flex items-center">
      
     <Link to={'/'}><SiSharex className="h-8 w-8 mr-4"/></Link> 
     <Link to={'/'}><h1 className="text-lg font-bold">Share Pod</h1></Link> 
    </div>
    
  </header>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Upload Your File</h2>
          <p className="text-gray-600">
            Accepted file types: jpg, jpeg, png, mp4, avi, mov, mkv, pdf. Max
            size: 1GB
          </p>
        </div>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed h-56 p-6 flex items-center justify-center text-center rounded-lg cursor-pointer ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-green-500">{file.name}</p>
          ) : (
            <p className="text-gray-500 text-center">
              Drag 'n' drop a file here, or click to select a file
            </p>
          )}
        </div>
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
        {loading && (
          <div className="mt-4 w-full bg-gray-200 rounded-full">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
            {estimatedTime && (
              <p className="text-center mt-2 h-6 text-gray-500">
                Estimated time remaining: {estimatedTime} seconds
              </p>
            )}
          </div>
        )}
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default FileUpload;
