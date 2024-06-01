import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SheetDemo() {
  const [selectedButton, setSelectedButton] = useState("Update Gallery");

  const buttons = [
    { name: "Update Gallery", path: "/" },
    { name: "Update Announcement", path: "/updateAnnouncement" },
    { name: "Update Results", path: "/updateResult" },
    { name: "Update Testimonials", path: "/updateTestimonials" },
    { name: "Update Batches", path: "/updateBatch" },
    { name: "Update Course Details", path: "/updateCourse" },
  ];

  return (
    <Sheet  >
      <SheetTrigger asChild>
      <Button className=' sm:hidden' size="icon">
      <ChevronRight className="h-4 w-4" />
    </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>The Lakshaya</SheetTitle>
        </SheetHeader>
        <div className={`basis-1/5 grid content-start gap-3 p-5`}>
          {buttons.map((button, index) => (
            <SheetClose asChild key={index}>
              <Link to={button.path}>
                <Button
                  variant={selectedButton === button.name ? "" : "outline"}
                  className="w-full mx-auto transition-all active:scale-95 shadow-sm"
                  onClick={() => setSelectedButton(button.name)}
                >
                  {button.name}
                </Button>
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
