import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import Button from "../sidebar/Button";
import { toast, Toaster } from "sonner";
import DialogDemo from "@/components/DialogButton";
import { Description } from "@radix-ui/react-alert-dialog";

const UpdateTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [isupdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [testimonialForUpdate, setTestimonialForUpdate] = useState({});

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${backend_url}/api/testimonials/get`);

      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }

      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Log form data for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(`${backend_url}/api/testimonials/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        throw new Error("Failed to add testimonial");
      }

      // Fetch testimonials again after successful POST request
      toast.success("Testimonial uploaded successfully!", {
        duration: 3000,
      });
      fetchTestimonials();
      e.target.reset();
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to add testimonial");
    }
  };

  const handleUpdate = async ({ event, id }) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Log form data for debugging
    for (let [key, value] of formData.entries()) {
      console.log(value);
    }

    try {
      const response = await fetch(
        `${backend_url}/api/testimonials/update/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (res.status === 200 || res.status === 201) {
        fetchTestimonials();
        toast.success("Testimonial deleted successfully!", {
          duration: 3000,
        });
      } else {
        toast.error("Failed to delete the testimonials. Please try again.", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      setError("Failed to add testimonial");
    } finally {
      setIsUpdateModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(backend_url + `/api/testimonials/remove?id=${id}`, {
      method: "DELETE", // Assuming it's POST, change to DELETE if required.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      // body: JSON.stringify({ id }), // Pass id in the request body as specified.
    });

    if (res.status === 200 || res.status === 201) {
      fetchTestimonials();
      toast.success("Testimonial deleted successfully!", {
        duration: 3000,
      });
    } else {
      toast.error("Failed to delete the testimonials. Please try again.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Update Testimonials</CardTitle>
          <CardDescription>Enter the testimonials details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="gap-3 grid sm:grid-cols-2">
            <Input name="name" placeholder="Title" required />
            <Input name="designation" placeholder="Designation" required />
            <Input name="description" placeholder="Description" required />
            <Input name="image" type="file" placeholder="Image" required />
            <Toaster richColors />
            <Button type="submit" className="w-fit">
              Submit
            </Button>
          </form>
          {/* {error && <p className="text-red-500">{error}</p>} */}
        </CardContent>
        <CardFooter className="flex-col items-start space-y-2 mt-5">
          <CardTitle>Testimonials Details</CardTitle>
          <CardDescription>View the testimonials details below</CardDescription>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S No.</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.length > 0 ? (
                testimonials.map((testimonial, index) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{testimonial.name}</TableCell>
                    <TableCell>{testimonial.Designation}</TableCell>
                    <TableCell>{testimonial.Description}</TableCell>
                    <TableCell>
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.title}
                        width="50"
                        height="50"
                      />
                    </TableCell>
                    <TableCell className="">
                      <DialogDemo
                        deleteFor="testimonial"
                        onClick={() => handleDelete(testimonial.id)}
                        className=""
                        variant="destructive"
                      />
                    </TableCell>
                    <TableCell className="">
                      <Button
                        size="small"
                        className=" px-2 py-1 text-xs mb-4"
                        onClick={() => {
                          setIsUpdateModalOpen(true);
                          setTestimonialForUpdate(testimonial);
                        }}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-sm text-muted-foreground text-center"
                  >
                    No testimonials found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardFooter>
      </Card>

      <Dialog open={isupdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Announcement</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(event) => handleUpdate({event, id: testimonialForUpdate.id})}
            className="gap-3 grid sm:grid-cols-2"
          >
            <Input
              name="name"
              value={testimonialForUpdate.name}
              onChange={(e) =>
                setTestimonialForUpdate({
                  ...testimonialForUpdate,
                  name: e.target.value,
                })
              }
              placeholder="Name"
              required
            />
            <Input
              name="designation"
              value={testimonialForUpdate.Designation}
              onChange={(e) =>
                setTestimonialForUpdate({
                  ...testimonialForUpdate,
                  Designation: e.target.value,
                })
              }
              placeholder="Designation"
              required
            />
            <Input
              name="description"
              value={testimonialForUpdate.Description}
              onChange={(e) =>
                setTestimonialForUpdate({
                  ...testimonialForUpdate,
                  Description: e.target.value,
                })
              }
              placeholder="Description"
              required
            />
            <div className="flex gap-2">
              {testimonialForUpdate.image ? (
                <div className="w-12 h-12">
                  <img src={URL.createObjectURL(testimonialForUpdate.image)} />
                </div>
              ) : (
                <div className="w-12 h-12">
                  <img src={testimonialForUpdate.image_url} />
                </div>
              )}
              <Input
                name="image"
                type="file"
                accept="image/*"
                placeholder="Image"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  console.log(URL.createObjectURL(e.target.files[0]));
                  setTestimonialForUpdate({
                    ...testimonialForUpdate,
                    image: e.target.files[0],
                  });
                }}
              />
            </div>
            <Toaster richColors />
            <Button type="submit" className="w-fit">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateTestimonials;
