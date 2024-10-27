import React, { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Sidebar = ({ className, handleLogout }) => {
  const [selectedButton, setSelectedButton] = useState("Update Gallery");

  const buttons = [
    { name: "Update Gallery", path: "/" },
    { name: "Update Announcement", path: "/updateAnnouncement" },
    { name: "Update Results", path: "/updateResult" },
    { name: "Update Testimonials", path: "/updateTestimonials" },
    { name: "Update Batches", path: "/updateBatch" },
    { name: "Update Course Details", path: "/updateCourse" },
    { name: "View Regeistered Students", path: "/resgisteredStudents" },
    { name: "View Payment Details", path: "/paymentDetails" },
  ];

  return (
    <div className={`basis-1/5 grid content-between gap-3 p-5 ${className}`}>
      <div className="grid gap-3 content-start">
        {buttons.map((button, index) => (
          <Link to={button.path} key={index}>
            <div
              className={`w-full text-left  transition-all active:scale-95 p-2 rounded-md ${
                selectedButton === button.name
                  ? 'bg-secondary text-secondary-foreground text-base font-semibold'
                  : ' hover:bg-accent hover:text-accent-foreground text-sm text-gray-600'
              }`}
              onClick={() => setSelectedButton(button.name)}
            >
              {button.name}
            </div>
          </Link>
        ))}
      </div>

      <Button
        variant="destructive"
        className="w-full mx-auto transition-all p-7 active:scale-95 shadow-sm"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
