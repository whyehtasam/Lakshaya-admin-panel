import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
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

const UpdateAnnouncement = () => {
  const titleInput = useRef();
  const descriptionInput = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = titleInput.current.value;
    const description = descriptionInput.current.value;

    const response = await fetch("https://your-api-url.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      console.log("Announcement updated successfully");
    } else {
      console.error("Announcement update failed");
    }
  };

  const accordionData = [
    { title: "Title 1", content: "Content 1" },
    { title: "Title 2", content: "Content 2" },
  ];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Update Notice Announcement</CardTitle>
          <CardDescription>
            Enter the title and description of the notice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className=" space-y-3">
            <Input ref={titleInput} placeholder="Notice Title" />
            <Textarea ref={descriptionInput} placeholder="Notice Description" />
            <Button type="submit">Update</Button>
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
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateAnnouncement;
