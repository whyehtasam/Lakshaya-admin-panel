import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import Button from "../sidebar/Button";
import { toast, Toaster } from "sonner";

const UpdateCourse = () => {
  const [courses, setCourses] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [course_name, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [fee, setFee] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const cardDesc = useRef(null);
  const [expandedStates, setExpandedStates] = useState([]);

  const toggleSyllabus = (index) => {
    setExpandedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  useEffect(() => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");
    fetch(backend_url + "/api/course/get", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setExpandedStates(new Array(data.length).fill(false));
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const res = await fetch(backend_url + "/api/course/add", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        course_name,
        fee,
        duration,
        description,
        syllabus,
      }),
    });

    if (res.status == 200 || res.status == 201) {
      if (cardDesc.current)
        cardDesc.current.textContent = "course updated successfully";
      toast.success("Course updated successfully!", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Update Course Details</CardTitle>
          <CardDescription ref={cardDesc}>
            Enter the course details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="gap-3 grid  sm:grid-cols-2">
            <Input
              name="courseName"
              placeholder="Course Name"
              onChange={(e) => setCourseName(e.target.value)}
            />
            <Input
              name="duration"
              placeholder="Duration"
              onChange={(e) => setDuration(e.target.value)}
            />
            <Input
              name="fee"
              placeholder="Fee"
              onChange={(e) => setFee(e.target.value)}
            />
            <Input
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Textarea
              className="sm:col-span-2"
              name="syllabus"
              placeholder="Syllabus"
              onChange={(e) => setSyllabus(e.target.value)}
            />
            <Button type="submit" className="w-fit">
              Submit
            </Button>
            <Toaster richColors />
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start space-y-2 mt-5">
          <CardTitle>Course Details</CardTitle>
          <CardDescription>View the course details below</CardDescription>
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
                    <TableCell className="align-top">
                      {course.course_name}
                    </TableCell>
                    <TableCell className="align-top">
                      {course.duration}
                    </TableCell>
                    <TableCell className="align-top">{course.fee}</TableCell>
                    <TableCell className="align-top">
                      {course.description}
                    </TableCell>
                    <TableCell className="align-top">
                      <pre className="w-full break-words whitespace-pre-wrap">
                        {expandedStates[index]
                          ? course.syllabus
                          : `${course.syllabus.substring(0, 20)}...`}
                        <button
                          onClick={() => toggleSyllabus(index)}
                          className="text-slate-500 hover:underline ml-2"
                        >
                          {expandedStates[index] ? "View Less" : "View More"}
                        </button>
                      </pre>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-sm text-muted-foreground text-center"
                  >
                    No data found
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

export default UpdateCourse;