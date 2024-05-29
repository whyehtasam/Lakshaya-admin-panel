import React from "react";
import Button from "./Button";

const Sidebar = ({ className }) => {
  return (
    <div className={`basis-1/5  h-screen space-y-3 p-5 ${className}`}>
      <Button className="w-full mx-auto transition-all p-7 active:scale-95 shadow-sm ">
        Upload Gallery{" "}
      </Button>
      <Button className="w-full mx-auto transition-all p-7 active:scale-95 shadow-sm">
        Update Announcement{" "}
      </Button>
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
