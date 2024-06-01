import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

const UpdateTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const testimonial = Object.fromEntries(formData.entries());
    setTestimonials([...testimonials, testimonial]);
    e.target.reset();
  };

  return (
    <div className="h-full">
    <Card className='h-full overflow-auto'>
        <CardHeader>
          <CardTitle>Update Testimonials</CardTitle>
          <CardDescription>Enter the testimonials details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="gap-3 grid grid-cols-2">
            <Input name="name" placeholder="Name" />
            <Input name="designation" placeholder="Designation" />
            <Input name="description" placeholder="Description" />
            <Input name="img" type="file" placeholder="Image" />
            <Button type="submit" className='w-fit'>Submit</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
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
                    <TableCell>{testimonial.designation}</TableCell>
                    <TableCell>{testimonial.description}</TableCell>
                    <TableCell>
                      <img src={URL.createObjectURL(testimonial.img)} alt={testimonial.name} width='50' height='50' />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No testimonials found</TableCell>
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