import React from "react";
import UploadGallery from "./UploadGallery";
import { Route, Routes } from "react-router-dom";
import UpdateAnnouncemenet from "./UpdateAnnouncemenet";
import UpdateResult from "./UpdateResult";
import UpdateTestimonials from "./UpdateTestimonials";
import UpdateBatch from "./UpdateBatch";
import UpdateCourse from "./UpdateCourse";
import RegisteredStudents from "./RegisteredStudents";
import PaymentDetails from "./PaymentDetails";
import UpdatePoster from "./UpdatePoster";
const Dashboard = ({className}) => {
  
  return (
    <div className={`dashboard w-full overflow-hidden lg:overflow-auto sm:basis-4/5 sm:py-5 sm:pr-5 p-0 ${className}`}>
      <Routes>
        <Route path="/" element={<UpdatePoster />} />
        <Route path="/updateGallery" element={<UploadGallery />} />

        <Route path="/updateAnnouncement" element={<UpdateAnnouncemenet/>} />
        <Route path="/updateResult" element={<UpdateResult/>} />
        <Route path="/updateTestimonials" element={<UpdateTestimonials/>} />
        <Route path="/updateBatch" element={<UpdateBatch/>} />
        <Route path="/updateCourse" element={<UpdateCourse/>} />
        <Route path="/resgisteredStudents" element={<RegisteredStudents/>} />
        <Route path="/paymentDetails" element={<PaymentDetails/>} />
      </Routes>
    </div>
  );
};

export default Dashboard;