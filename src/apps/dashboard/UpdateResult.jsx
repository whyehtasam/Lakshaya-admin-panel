import { useState, useEffect } from "react";
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
import { toast, Toaster } from "sonner";
import DialogDemo from "@/components/DialogButton";

const UpdateResult = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    exam: "",
    examYear: "",
    rank: "",
    img: "",
  });
  const [results, setResults] = useState([]);

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  // Function to fetch results from the API
  const fetchResults = () => {
    fetch(backend_url + "/api/result/get", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setResults(data.reverse())) // Reverse the order to show latest first
      .catch((e) => console.log(e));
  };

  // Fetch results on component mount
  useEffect(() => {
    fetchResults();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      exam: formData.exam,
      exam_year: formData.examYear,
      rank: formData.rank,
      image_url: formData.img,
    };

    fetch(backend_url + "/api/result/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Result updated successfully");
          toast.success("Result updated successfully!",{
            duration: 3000,
          })
          fetchResults(); // Fetch results immediately after submission
        } else {
          console.error("Result update failed");
        }
      })
      .catch((e) => console.log(e));

    setFormData({
      name: "",
      description: "",
      exam: "",
      examYear: "",
      rank: "",
      img: "",
    });
  };


  const handleDelete = async (id) => {
    const res = await fetch(backend_url + `/api/result/remove?id=${id}`, {
      method: "DELETE", // Assuming it's POST, change to DELETE if required.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      // body: JSON.stringify({ id }), // Pass id in the request body as specified.
    });

    if (res.status === 200 || res.status === 201) {
      fetchResults();
      toast.success("Result deleted successfully!", {
        duration: 3000,
      });
    } else {
      toast.error("Failed to delete the result. Please try again.", {
        duration: 3000,
      });
    }
  };


  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Update Result</CardTitle>
          <CardDescription>Enter the result details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="gap-3 grid sm:grid-cols-2">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <Input
              name="exam"
              value={formData.exam}
              onChange={handleChange}
              placeholder="Exam"
            />
            <Input
              name="examYear"
              value={formData.examYear}
              onChange={handleChange}
              placeholder="Exam Year"
            />
            <Input
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              placeholder="Rank"
            />
            <Input
              name="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="Image URL"
            />
            <Button type="submit" className="w-fit">
              Update
            </Button>
            <Toaster richColors />
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start space-y-2 mt-5">
          <CardTitle>Result Details</CardTitle>
          <CardDescription>
            View the list student&apos;s results
          </CardDescription>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length > 0 ? (
                results.map((result, index) => (
                  <TableRow key={result.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{result.name}</TableCell>
                    <TableCell>{result.exam}</TableCell>
                    <TableCell>{result.exam_year}</TableCell>
                    <TableCell>{result.description}</TableCell>
                    <TableCell>{result.rank}</TableCell>
                    <TableCell>
                      <img
                        src={result.image_url}
                        alt={result.name}
                        width="50"
                        height="50"
                      />
                    </TableCell>
                    <TableCell className="">
                      <DialogDemo
                        deleteFor="course"
                        onClick={() => handleDelete(result.id)}
                        className=""
                        variant="destructive"
                      />
                    </TableCell>

                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-sm text-muted-foreground text-center"
                  >
                    No results found
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

export default UpdateResult;
