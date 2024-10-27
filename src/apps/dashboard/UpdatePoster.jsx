import { useEffect, useRef, useState } from "react";
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
import DialogDemo from "@/components/DialogButton";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem("token");

const UpdatePoster = () => {
  const fileInput = useRef(null);
  const [popups, setPopups] = useState([]);

  const fetchPopups = async () => {
    try {
      const response = await fetch(`${backend_url}/api/popup/get`);
      const data = await response.json();
      setPopups(data);
    } catch (error) {
      console.error("Failed to fetch popups", error);
      toast.error("Failed to fetch popups. Please try again.");
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fileInput.current && fileInput.current.files[0]) {
      const file = fileInput.current.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(`${backend_url}/api/popup/add`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          toast.success("Popup image uploaded successfully!");
          fetchPopups();
          event.target.reset();
        } else {
          throw new Error("Popup image upload failed");
        }
      } catch (error) {
        console.error("Popup image upload failed", error);
        toast.error("Popup image upload failed. Please try again.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${backend_url}/api/popup/remove?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Popup image deleted successfully!");
        fetchPopups();
      } else {
        throw new Error("Failed to delete the popup image");
      }
    } catch (error) {
      console.error("Failed to delete the popup image", error);
      toast.error("Failed to delete the popup image. Please try again.");
    }
  };

  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Upload Popup Image</CardTitle>
          <CardDescription>Select an image to upload for the popup</CardDescription>
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
          <CardTitle>All popup images</CardTitle>
          <CardDescription>Hover over an image to delete</CardDescription>
        </CardHeader>
        <CardContent>
          {popups.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
              {popups.map((popup) => (
                <div key={popup.image_id} className="relative group">
                  <img
                    src={popup.image_url}
                    alt={`Popup ${popup.image_id}`}
                    className="object-cover w-full h-48 rounded-md group-hover:object-contain transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    
                    <DialogDemo
                      deleteFor="poster"
                      onClick={() => handleDelete(popup.image_id)}
                      className=""
                      variant="destructive"
                  />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full">
              <p className="text-sm text-muted-foreground text-center">
                No images found
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <Toaster richColors />
    </div>
  );
};

export default UpdatePoster;
