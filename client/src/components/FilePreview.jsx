import { useSelector, useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import FileUpload from "./FileUpload";
import { deleteFile } from "../redux/slice/fileSlice";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaDownload,
  FaCopy,
  FaEllipsisV,
  FaTrash,
} from "react-icons/fa";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./HeaderComp";

const FilePreview = () => {
  const { files } = useSelector((state) => state.file);
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(null);
  const qrCodeRef = useRef({});

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertSVGToCanvas = (svgElement) => {
    return new Promise((resolve, reject) => {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      };

      img.onerror = reject;
      img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
    });
  };

  const handleDownloadQR = async (path) => {
    const qrSvg = qrCodeRef.current[path].querySelector("svg");
    if (qrSvg) {
      try {
        const canvas = await convertSVGToCanvas(qrSvg);
        const qrImageUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = qrImageUrl;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error converting SVG to Canvas:", error);
      }
    } else {
      console.error("QR SVG not found");
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      dispatch(deleteFile(index));
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      <div className=" flex flex-col justify-between h-screen">
        <Header />

        <div className="max-w-[1200px] mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
          <h2 className="text-xl font-bold mb-2">Uploaded Files</h2>
          {files.length === 0 ? (
            <p>No files uploaded yet.</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Filename</th>
                  <th className="px-4 py-2">Content Type</th>
                  <th className="px-4 py-2">Size</th>
                  <th className="px-4 py-2">Uploaded</th>
                  <th className="px-4 py-2">Preview</th>
                  <th className="px-4 py-2">Download</th>
                  <th className="px-4 py-2">Actions</th>
                  <th className="px-4 py-2">Share</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={file.data.name}>
                    {file.data.name}</td>
                    <td className="border px-4 py-2">{file.data.type}</td>
                    <td className="border px-4 py-2">
                      {(file.data.size / (1024 * 1024)).toFixed(2)} MB
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(file.data.createdAt).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {file.data.type.startsWith("image") && (
                        <img
                          src={file.path}
                          alt={file.data.name}
                          className="h-16 w-16 object-cover"
                        />
                      )}
                      {file.data.type.startsWith("video") && (
                        <video
                          src={file.path}
                          className="h-16 w-16 object-cover"
                          controls
                        />
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() =>
                          handleDownload(file.path, file.data.name)
                        }
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        <div className="flex items-center justify-center">
                          <FaDownload className="mr-2" /> Download File
                        </div>
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        >
                          <FaEllipsisV />
                        </button>
                        {openDropdown === index && (
                          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="none">
                              <button
                                onClick={() => handleDownloadQR(file.path)}
                                className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                                title="Download QR code for this file"
                              >
                                <div className="flex items-center ">
                                  <FaDownload className="mr-2" />{" "}
                                  <strong>Download QR</strong>
                                </div>
                                <div
                                  ref={(el) =>
                                    (qrCodeRef.current[file.path] = el)
                                  }
                                  style={{ display: "none" }}
                                >
                                  <QRCode value={file.path} />
                                </div>
                              </button>
                              <button
                                onClick={() => handleCopyUrl(file.path)}
                                className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                                title="Copy URL to clipboard"
                              >
                                <div className="flex items-center">
                                  <FaCopy className="mr-2" />
                                  <strong>Copy URL</strong>{" "}
                                </div>
                              </button>
                              <button
                                onClick={() => handleDelete(index)}
                                className="text-red-700 block px-4 py-2 text-sm w-full text-left"
                              >
                                <div className="flex items-center ">
                                  {" "}
                                  <FaTrash className="mr-2" />{" "}
                                  <strong>Delete</strong>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-2">
                        <FacebookShareButton
                          url={file.path}
                          className="w-full text-left"
                          title="Share on Facebook"
                        >
                          <FaFacebook className="text-blue-600" />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={file.path}
                          className="w-full text-left"
                          title="Share on Twitter"
                        >
                          <FaTwitter className="text-blue-400" />
                        </TwitterShareButton>
                        <WhatsappShareButton
                          url={file.path}
                          className="w-full text-left"
                          title="Share on WhatsApp"
                        >
                          <FaWhatsapp className="text-green-500" />
                        </WhatsappShareButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default FilePreview;
