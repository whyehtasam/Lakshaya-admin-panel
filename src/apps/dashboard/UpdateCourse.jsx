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
import { Textarea } from "@/components/ui/textarea";

const UpdateCourse = () => {
  const [courses, setCourses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const course = Object.fromEntries(formData.entries());
    setCourses([...courses, course]);
    e.target.reset();
  };

  return (
    <div className="h-full">
      <Card className='h-full overflow-auto'>
        <CardHeader>
          <CardTitle>Update Course Details</CardTitle>
          <CardDescription>Enter the course details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="gap-3 grid grid-cols-2">
            <Input name="courseName" placeholder="Course Name" />
            <Input name="duration" placeholder="Duration" />
            <Input name="fee" placeholder="Fee" />
            <Input name="description" placeholder="Description" />
            <Textarea className='col-span-2' name="syllabus" placeholder="Syllabus" />
            <Button type="submit" className='w-fit'>Submit</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Syllabus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell>{course.fee}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>{course.syllabus}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className='text-center'>No data found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateCourse;