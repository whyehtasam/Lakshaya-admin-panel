import React from "react";
import UploadGallery from "./UploadGallery";
import { Route, Routes } from "react-router-dom";
import UpdateAnnouncemenet from "./UpdateAnnouncemenet";

const Dashboard = () => {
  return (
    <div className="dashboard basis-4/5 h-screen py-5 pr-5">
      <Routes>
        <Route path="/" element={<UploadGallery />} />
        <Route path="/updateAnnouncement" element={<UpdateAnnouncemenet/>} />
      </Routes>
    </div>
  );
};

export default Dashboard;