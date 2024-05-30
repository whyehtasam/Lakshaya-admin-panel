import React, { useRef } from "react";
import Button from "../sidebar/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UploadGallery = () => {
  const fileInput = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const file = fileInput.current.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("https://your-api-url.com", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Image uploaded successfully");
    } else {
      console.error("Image upload failed");
    }
  };

  const imageUrls = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  return (
    <div className="h-full">
      <Card className='h-full overflow-auto'>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>Select an image to upload</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className=" flex gap-3 place-items-end-end">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Choose picture</Label>
                <Input id="picture" type="file" />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="picture" className="text-white">
                  hb
                </Label>
                <Button type="submit" className="">
                  Upload
                </Button>
              </div>
            </div>
          </form>
        </CardContent>

        <CardHeader>
          <CardTitle>All pictures</CardTitle>
          <CardDescription>Select any image to modify</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-5">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`placeholder ${index}`}
                className="w-full h-48 object-cover rounded-md"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadGallery;
