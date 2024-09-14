import React, { useState } from "react";
import axios from "axios";

const ZipInfo = () => {
  const [zip, setZip] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setData(null); // Clear previous data
    try {
      const response = await axios.get(`http://localhost:8080/${zip}`);
      setData(response.data);
    } catch (err) {
      setError("Data not found for this zipcode");
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-2">Get Zip Code Info</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white rounded p-2">
          Get Info
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {data && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <h3 className="font-bold">Zip Code Info:</h3>
          <p>City: {data.uspsZipPrefCity}</p>
          <p>State: {data.uspsZipPrefState}</p>
          <p>Latitude: {data.latitude}</p>
          <p>Longitude: {data.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default ZipInfo;
