import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFiles } from "../../redux/slice/file/fileThunk";
import { formatDistanceToNowStrict, differenceInDays } from "date-fns";

const FileShow = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { files } = useSelector((state) => state.file);
  const [previewFile, setPreviewFile] = useState(null);
  const [shareFile, setShareFile] = useState(null); // For the share modal

  useEffect(() => {
    if (user && user._id) {
      dispatch(getUserFiles(user._id));
    }
  }, [user, dispatch]);

  const handleShare = (url) => {
    const encodedURL = encodeURIComponent(url);
    return {
      whatsapp: `https://wa.me/?text=${encodedURL}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      instagram: "#", // Instagram doesn't allow direct sharing via URL
      email: `mailto:?subject=File%20Share&body=Here's%20your%20file:%20${encodedURL}`,
      qr: `https://api.qrserver.com/v1/create-qr-code/?data=${encodedURL}&size=150x150`,
    };
  };

  return (
    <div className="flex flex-col mt-6">
      <h2 className="text-xl font-bold mb-4">Your Uploaded Files</h2>

      <div className="-my-2 overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden border rounded-md shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Download
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Expiry At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Uploaded At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files?.map((file) => {
                  const shareLinks = handleShare(file.shortUrl);
                  return (
                    <tr key={file._id}>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {file.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {
                          file.size>1024*1024
                            ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                            : file.size > 1024
                            ? `${(file.size / 1024).toFixed(2)} KB`
                            : `${file.size} Bytes`
                      
                        }
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {file.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {file.downloadedContent}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-600">
                        {file.status}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-3">
                        <button
                          onClick={() => setPreviewFile(file)}
                          className="text-blue-600 hover:underline"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => setShareFile(file)}
                          className="text-purple-600 hover:underline"
                        >
                          Share
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {differenceInDays(
                          new Date(file.expiresAt),
                          new Date()
                        ) > 0
                          ? `Expires in ${differenceInDays(
                              new Date(file.expiresAt),
                              new Date()
                            )} days`
                          : "Expired"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        Uploaded{" "}
                        {formatDistanceToNowStrict(new Date(file.createdAt), {
                          addSuffix: true,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
            <h3 className="text-lg font-bold mb-2">{previewFile.name}</h3>
            <iframe
              src={previewFile.path}
              title="File Preview"
              className="w-full h-96 border"
            ></iframe>
            <div className="mt-4 text-right">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {shareFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Share "{shareFile.name}"</h3>
            <div className="space-y-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  shareFile.shortUrl
                )}`}
                target="_blank"
                rel="noreferrer"
                className="block text-green-600 hover:underline"
              >
                Share via WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareFile.shortUrl
                )}`}
                target="_blank"
                rel="noreferrer"
                className="block text-blue-600 hover:underline"
              >
                Share via Facebook
              </a>
              <a
                href={`mailto:?subject=File Share&body=Here is the file link: ${shareFile.shortUrl}`}
                className="block text-red-600 hover:underline"
              >
                Share via Email
              </a>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  QR Code:
                </p>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                    shareFile.shortUrl
                  )}&size=150x150`}
                  alt="QR Code"
                  className="border rounded"
                />
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setShareFile(null)}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileShow;
