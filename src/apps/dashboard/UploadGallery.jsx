import React, { useEffect, useRef, useState } from "react";
import Button from "../sidebar/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UploadGallery = () => {
  const fileInput = useRef();
  const [images, setImages] = useState([]);

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  
  const fetchImages = async () => {
    try {
      const response = await fetch(backend_url + "/api/gallery/get");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const file = fileInput.current.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(backend_url + "/api/gallery/add", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (response.ok) {
      console.log("Image uploaded successfully");
      // Optionally, re-fetch images to update the list after upload
      fetchImages();
    } else {
      console.error("Image upload failed");
    }
  };

  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>Select an image to upload</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3 place-items-end-end">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Choose picture</Label>
                <Input id="picture" type="file" ref={fileInput} />
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
            {images.map((image) => (
              <img
                key={image.image_id}
                src={image.image_url}
                alt={`Uploaded ${image.image_id}`}
                className="w-full h-48 object-contain rounded-md"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadGallery;
