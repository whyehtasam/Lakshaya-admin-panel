import React, { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
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
import { toast, Toaster } from "sonner";

const backend_url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem("token");

const UploadGallery = () => {
  const fileInput = useRef(null);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${backend_url}/api/gallery/get`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch images", error);
      toast.error("Failed to fetch images. Please try again.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fileInput.current && fileInput.current.files[0]) {
      const file = fileInput.current.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(`${backend_url}/api/gallery/add`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          toast.success("Image uploaded successfully!");
          fetchImages();
          event.target.reset();
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        console.error("Image upload failed", error);
        toast.error("Image upload failed. Please try again.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${backend_url}/api/gallery/remove?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Image deleted successfully!");
        fetchImages();
      } else {
        throw new Error("Failed to delete the image");
      }
    } catch (error) {
      console.error("Failed to delete the image", error);
      toast.error("Failed to delete the image. Please try again.");
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Choose picture</Label>
                <Input id="picture" type="file" ref={fileInput} />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Upload
              </Button>
            </div>
          </form>
        </CardContent>

        <CardHeader>
          <CardTitle>All pictures</CardTitle>
          <CardDescription>Hover over an image to delete</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {images.map((image) => (
              <div key={image.image_id} className="relative group">
                <img
                  src={image.image_url}
                  alt={`Uploaded ${image.image_id}`}
                  className="object-cover w-full h-48 rounded-md group-hover:object-contain transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(image.image_id)}
                    className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                    aria-label="Delete image"
                  >
                    <Trash2 className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Toaster richColors />
    </div>
  );
};

export default UploadGallery;