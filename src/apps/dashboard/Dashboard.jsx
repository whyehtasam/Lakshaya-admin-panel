import React from "react";
import UploadGallery from "./UploadGallery";
import { Route, Routes } from "react-router-dom";
import UpdateAnnouncemenet from "./UpdateAnnouncemenet";

const Dashboard = ({className}) => {
  return (
    <div className={`dashboard w-full sm:basis-4/5 sm:py-5 sm:pr-5 p-0 ${className}`}>
      <Routes>
        <Route path="/" element={<UploadGallery />} />
        <Route path="/updateAnnouncement" element={<UpdateAnnouncemenet/>} />
      </Routes>
    </div>
  );
};

export default Dashboard;