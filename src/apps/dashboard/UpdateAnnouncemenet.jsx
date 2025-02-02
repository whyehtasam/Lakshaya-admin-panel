import { useRef, useState, useEffect } from "react";
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
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import DialogDemo from "@/components/DialogButton";
import { useFetch } from "../context/useFetch";

const UpdateAnnouncement = () => {
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);
  const cardHeader = useRef(null);
  const [accordionData, setAccordionData] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [isupdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [announcementForUpdate, setAnnouncementForUpdate] = useState({});

  const { fetchedData } = useFetch("/api/announcement/get", "GET");

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(backend_url + "/api/announcement/get", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setAccordionData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    console.log(
      "Announcements fetched successfully from useFetch",
      fetchedData
    );
  }, [fetchedData]);

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

  const handleUpdate = async ({event, id, title, description}) => {
    event.preventDefault();
    console.log(id)
    console.log(title)
    console.log(description)
    if(!id || !title || !description) return;
    const res = await fetch(backend_url + `/api/announcement/update/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ title,  description}),
    });

    if (res.status === 200 || res.status === 201) {
      fetchAnnouncements();
      toast.success("Announcement updated successfully!", {
        duration: 3000,
      });
      setIsUpdateModalOpen(false);
    } else {
      toast.error("Failed to udpate the announcement. Please try again.", {
        duration: 3000,
      });
      setIsUpdateModalOpen(false);
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
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.description}</AccordionContent>
                <div className="mb-1">
                  <DialogDemo
                    deleteFor="announcement"
                    onClick={() => handleDelete(item.id)}
                    className=""
                    variant="destructive"
                  />
                </div>
                <Button
                  size="small"
                  className=" px-2 py-1 text-xs mb-4"
                  onClick={() => {
                    setIsUpdateModalOpen(true);
                    setAnnouncementForUpdate(item);
                  }}
                >
                  Update
                </Button>
              </AccordionItem>
            ))}
          </Accordion>
        </CardFooter>
      </Card>

      <Dialog open={isupdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Announcement</DialogTitle>
          </DialogHeader>
          <form onSubmit={(event)=>handleUpdate({event,...announcementForUpdate})} className=" space-y-3">
            <Input onChange={(e)=>setAnnouncementForUpdate({...announcementForUpdate, title: e.target.value })} value={announcementForUpdate.title} placeholder="Notice Title" />
            <Textarea onChange={(e)=> setAnnouncementForUpdate({...announcementForUpdate, description: e.target.value})} value={announcementForUpdate.description} placeholder="Notice Description" />
            <Button type="submit">Update</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateAnnouncement;
