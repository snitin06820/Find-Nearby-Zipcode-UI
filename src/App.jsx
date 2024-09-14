import React from "react";
import FileUpload from "./components/FileUpload";
import ZipInfo from "./components/ZipInfo";
import NearbyZipCodes from "./components/NearbyZipcodes";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Zip Code Information</h1>
      <div className="space-y-4 w-full max-w-md">
        <FileUpload />
        <ZipInfo />
        <NearbyZipCodes />
      </div>
    </div>
  );
};

export default App;
