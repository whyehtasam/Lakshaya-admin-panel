import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { toast, Toaster } from "sonner";
import DialogDemo from "@/components/DialogButton";
const RegisteredStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchRegisteredStudents();
  }, []);

  const fetchRegisteredStudents = async () => {
    try {
      
      const response = await fetch(`${backend_url}/api/registration/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch registered students");
      }

      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching registered students:", error);
      setError(error.message);
      setLoading(false);
      toast.error("Failed to load registered students. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(backend_url + `/api/registration/remove?id=${id}`, {
      method: "DELETE", // Assuming it's POST, change to DELETE if required.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      // body: JSON.stringify({ id }), // Pass id in the request body as specified.
    });

    if (res.status === 200 || res.status === 201) {
      fetchRegisteredStudents();
      toast.success("Course deleted successfully!", {
        duration: 3000,
      });
    } else {
      toast.error("Failed to delete the course. Please try again.", {
        duration: 3000,
      });
    }
  };
  

  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Registered Students</CardTitle>
          <CardDescription>View all registered students</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Stream</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.stream}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.contact}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell className="align-top">
                        <DialogDemo
                          deleteFor="registered student"
                          onClick={() => handleDelete(student.id)}
                          className=""
                          variant="destructive"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No registered students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Toaster richColors />
    </div>
  );
};

export default RegisteredStudents;
