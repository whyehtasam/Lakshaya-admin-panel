import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Sidebar = ({ className }) => {
  return (
    <div className={`basis-1/5  h-screen grid content-start gap-3 p-5 ${className}`}>
      <Link to="/" className="">
        <Button className="w-full mx-auto transition-all p-7 active:scale-95 shadow-sm ">
          Update Gallery{" "}
        </Button>
      </Link>
      <Link to="updateAnnouncement">
        <Button className="w-full mx-auto transition-all p-7 active:scale-95 shadow-sm">
          Update Announcement{" "}
        </Button>
      </Link>
      <Button className="w-full mx-auto transition-all p-7 active:scale-95 shadow-sm">
        Update Results{" "}
      </Button>
      <Button className="w-full mx-auto transition-all p-7 active:scale-95 shadow-sm">
        Update Testimonials{" "}
      </Button>
      <Button className="w-full mx-auto transition-all p-7 active:scale-95 shadow-sm">
        Update Batches{" "}
      </Button>
      <Button className="w-full mx-auto transition-all p-7 active:scale-95 shadow-sm">
        Update Course Details
      </Button>
    </div>
  );
};

export default Sidebar;
