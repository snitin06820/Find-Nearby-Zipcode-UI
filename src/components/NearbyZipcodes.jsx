import React, { useState } from "react";
import axios from "axios";

const NearbyZipCodes = () => {
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState(20);
  const [nearbyZips, setNearbyZips] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const zipsPerPage = 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNearbyZips([]); // Clear previous results
    setCurrentPage(1); // Reset to first page

    try {
      const response = await axios.get(
        `http://localhost:8080/nearbyZipCodes?zipcode=${zip}&radius=${radius}`
      );
      setNearbyZips(response.data);
    } catch (err) {
      setError("No zip codes found nearby");
    }
  };

  // Pagination logic
  const indexOfLastZip = currentPage * zipsPerPage;
  const indexOfFirstZip = indexOfLastZip - zipsPerPage;
  const currentZips = nearbyZips.slice(indexOfFirstZip, indexOfLastZip);
  const totalPages = Math.ceil(nearbyZips.length / zipsPerPage);

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-2">Find Nearby Zip Codes</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
        />
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Radius (km)"
        />
        <button type="submit" className="bg-yellow-500 text-white rounded p-2">
          Find Nearby
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <ul className="mt-4">
        {currentZips.map((zip) => (
          <li key={zip.stdZip5} className="p-2 border rounded bg-gray-100 mb-2">
            {zip.stdZip5} - {zip.uspsZipPrefCity}, {zip.uspsZipPrefState}
          </li>
        ))}
      </ul>
      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 rounded p-2"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 rounded p-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NearbyZipCodes;
