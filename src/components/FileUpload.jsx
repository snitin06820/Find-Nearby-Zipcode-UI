import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/uploadFile",
        formData
      );
      setResponseMessage(response.data);
    } catch (error) {
      setResponseMessage("Error uploading file");
      console.error(error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-2">Upload Zip Code File</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="border border-gray-300 rounded p-2 mb-2 w-full"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white rounded p-2 w-full"
      >
        Upload
      </button>
      {responseMessage && <p className="mt-2">{responseMessage}</p>}
    </div>
  );
};

export default FileUpload;
