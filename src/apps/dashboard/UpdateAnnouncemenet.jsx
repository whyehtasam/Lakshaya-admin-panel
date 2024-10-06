import React, { useRef, useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
import Button from "../sidebar/Button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import DialogDemo from "@/components/DialogButton";

const UpdateAnnouncement = () => {
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);
  const cardHeader = useRef(null);
  const [accordionData, setAccordionData] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const fetchAnnouncements = () => {
    fetch(backend_url + "/api/announcement/get", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setAccordionData(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = titleInput.current.value;
    const description = descriptionInput.current.value;
    const token = localStorage.getItem("token");

    const response = await fetch(backend_url + "/api/announcement/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      console.log("Announcement updated successfully");
      toast.success("Announcement updated successfully!", {
        duration: 3000,
      });
      if (cardHeader.current)
        cardHeader.current.textContent = "Announcement updated successfully";
      titleInput.current.value = "";
      descriptionInput.current.value = "";
      fetchAnnouncements(); // Fetch announcements immediately after submission
    } else {
      console.error("Announcement update failed");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(backend_url + `/api/announcement/remove?id=${id}`, {
      method: "DELETE", // Assuming it's POST, change to DELETE if required.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      // body: JSON.stringify({ id }), // Pass id in the request body as specified.
    });

    if (res.status === 200 || res.status === 201) {
      fetchAnnouncements();
      toast.success("Announcement deleted successfully!", {
        duration: 3000,
      });
    } else {
      toast.error("Failed to delete the announcement. Please try again.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Update Notice Announcement</CardTitle>
          <CardDescription ref={cardHeader}>
            Enter the title and description of the notice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className=" space-y-3">
            <Input ref={titleInput} placeholder="Notice Title" />
            <Textarea ref={descriptionInput} placeholder="Notice Description" />
            <Button type="submit">Update</Button>
            <Toaster richColors />
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start space-y-2 mt-5">
          <CardTitle>Announcement Details</CardTitle>
          <CardDescription>
            View the title and description of each announcement
          </CardDescription>

          <Accordion type="single" collapsible className="w-full">
            {accordionData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger >
                  {item.title}
                  
                </AccordionTrigger>
                <AccordionContent>{item.description}</AccordionContent>
                <div className="mb-4">
                   <DialogDemo
                    deleteFor="course"
                    onClick={() => handleDelete(item.id)}
                    className=""
                    variant="destructive"
                  />
                </div>
               
              </AccordionItem>
            ))}
          </Accordion>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateAnnouncement;
