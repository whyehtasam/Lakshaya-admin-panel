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
import Button from "../sidebar/Button";
import { toast,Toaster } from "sonner";

const UpdateTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

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
            <Toaster richColors/>
            <Button type="submit" className="w-fit">
              Submit
            </Button>
          </form>
          {/* {error && <p className="text-red-500">{error}</p>} */}
        </CardContent>
        <CardFooter>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.length > 0 ? (
                testimonials.map((testimonial, index) => (
                  <TableRow key={index}>
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
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
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
    </div>
  );
};

export default UpdateTestimonials;
