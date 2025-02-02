import React, { useState, useEffect, useRef } from "react";
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
import DialogDemo from "@/components/DialogButton";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";

const UpdateCourse = () => {
  const [courses, setCourses] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    course_name: "",
    description: "",
    duration: "",
    fee: "",
    syllabus: "",
  });
  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    course_name: "",
    description: "",
    duration: "",
    fee: "",
    syllabus: "",
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [expandedStates, setExpandedStates] = useState([]);
  const cardDesc = useRef(null);

  const toggleSyllabus = (index) => {
    setExpandedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const fetchCourseDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backend_url}/api/course/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch course details");

      const data = await res.json();
      setCourses(data);
      setExpandedStates(new Array(data.length).fill(false));
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(backend_url + "/api/course/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Course added successfully!", { duration: 3000 });
        fetchCourseDetails();
        setFormData({
          course_name: "",
          description: "",
          duration: "",
          fee: "",
          syllabus: "",
        });
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(backend_url + `/api/course/remove?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.ok) {
        toast.success("Course deleted successfully!", { duration: 3000 });
        fetchCourseDetails();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        backend_url + `/api/course/update/${selectedCourse.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(selectedCourse),
        }
      );

      if (res.ok) {
        toast.success("Course updated successfully!", { duration: 3000 });
        fetchCourseDetails();
        setIsUpdateModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    }
  };

  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription ref={cardDesc}>
            Manage course details and information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="gap-3 grid sm:grid-cols-2">
            <Input
              name="course_name"
              value={formData.course_name}
              onChange={(e) =>
                setFormData({ ...formData, course_name: e.target.value })
              }
              placeholder="Course Name"
              required
            />
            <Input
              name="duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              placeholder="Duration"
              required
            />
            <Input
              name="fee"
              value={formData.fee}
              onChange={(e) =>
                setFormData({ ...formData, fee: e.target.value })
              }
              placeholder="Fee"
              required
            />
            <Input
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description"
              required
            />
            <Textarea
              className="sm:col-span-2"
              name="syllabus"
              value={formData.syllabus}
              onChange={(e) =>
                setFormData({ ...formData, syllabus: e.target.value })
              }
              placeholder="Syllabus"
              required
            />
            <Button type="submit" className="w-fit">
              Add Course
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start space-y-2 mt-5">
          <CardTitle>Course List</CardTitle>
          <CardDescription>Current courses and their details</CardDescription>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S No.</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Syllabus</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <TableRow key={course.id}>
                    <TableCell className="align-top">{index + 1}</TableCell>
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
                    <TableCell className="space-x-2">
                      <DialogDemo
                        deleteFor="course"
                        onClick={() => handleDelete(course.id)}
                        variant="destructive"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        className="px-2 py-1 text-xs mb-4"
                        onClick={() => {
                          setSelectedCourse({
                            id: course.id,
                            course_name: course.course_name,
                            duration: course.duration,
                            fee: course.fee,
                            description: course.description,
                            syllabus: course.syllabus,
                          });
                          setIsUpdateModalOpen(true);
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
                    colSpan={7}
                    className="text-sm text-muted-foreground text-center"
                  >
                    No courses found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardFooter>
      </Card>

      {/* Update Course Dialog */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="gap-3 grid sm:grid-cols-2">
            <Input
              name="course_name"
              value={selectedCourse.course_name}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  course_name: e.target.value,
                })
              }
              placeholder="Course Name"
              required
            />
            <Input
              name="duration"
              value={selectedCourse.duration}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  duration: e.target.value,
                })
              }
              placeholder="Duration"
              required
            />
            <Input
              name="fee"
              value={selectedCourse.fee}
              onChange={(e) =>
                setSelectedCourse({ ...selectedCourse, fee: e.target.value })
              }
              placeholder="Fee"
              required
            />
            <Input
              name="description"
              value={selectedCourse.description}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  description: e.target.value,
                })
              }
              placeholder="Description"
              required
            />
            <Textarea
              className="sm:col-span-2"
              name="syllabus"
              value={selectedCourse.syllabus}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  syllabus: e.target.value,
                })
              }
              placeholder="Syllabus"
              required
            />
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster richColors />
    </div>
  );
};

export default UpdateCourse;
