import React, { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Sidebar = ({ className }) => {
  const [selectedButton, setSelectedButton] = useState('Update Gallery');

  const buttons = [
    { name: 'Update Gallery', path: '/' },
    { name: 'Update Announcement', path: 'updateAnnouncement' },
    { name: 'Update Results', path: '#' },
    { name: 'Update Testimonials', path: '#' },
    { name: 'Update Batches', path: '#' },
    { name: 'Update Course Details', path: '#' },
  ];

  return (
    <div className={`basis-1/5 grid content-start gap-3 p-5 ${className}`}>
      {buttons.map((button, index) => (
        <Link to={button.path} key={index}>
          <Button
            variant={selectedButton === button.name ? "" : "outline"}
            className="w-full mx-auto transition-all p-7 active:scale-95 shadow-sm"
            onClick={() => setSelectedButton(button.name)}
          >
            {button.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;