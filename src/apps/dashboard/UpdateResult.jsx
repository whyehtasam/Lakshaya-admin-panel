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
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";

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
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState({
    id: "",
    name: "",
    description: "",
    exam: "",
    examYear: "",
    rank: "",
    img: "",
  });

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const fetchResults = () => {
    fetch(backend_url + "/api/result/get", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setResults(data.reverse()))
      .catch((e) => console.log(e));
  };

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
          toast.success("Result added successfully!", { duration: 3000 });
          fetchResults();
          setFormData({
            name: "",
            description: "",
            exam: "",
            examYear: "",
            rank: "",
            img: "",
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const handleDelete = async (id) => {
    const res = await fetch(backend_url + `/api/result/remove?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok) {
      toast.success("Result deleted successfully!", { duration: 3000 });
      fetchResults();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      name: selectedResult.name,
      description: selectedResult.description,
      exam: selectedResult.exam,
      exam_year: selectedResult.examYear,
      rank: selectedResult.rank,
      image_url: selectedResult.img,
    };

    try {
      const response = await fetch(
        backend_url + `/api/result/update/${selectedResult.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Result updated successfully!");
        fetchResults();
        setIsUpdateModalOpen(false);
      } else {
        toast.error("Failed to update result.");
      }
    } catch (error) {
      console.error("Error updating result:", error);
      toast.error("An error occurred while updating the result.");
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
              required
            />
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
            <Input
              name="exam"
              value={formData.exam}
              onChange={handleChange}
              placeholder="Exam"
              required
            />
            <Input
              name="examYear"
              value={formData.examYear}
              onChange={handleChange}
              placeholder="Exam Year"
              required
            />
            <Input
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              placeholder="Rank"
              required
            />
            <Input
              name="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="Image URL"
              required
            />
            <Button type="submit" className="w-fit">
              Add Result
            </Button>
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
                        className="h-15 w-15 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell className="space-x-2">
                      <DialogDemo
                        deleteFor="result"
                        onClick={() => handleDelete(result.id)}
                        variant="destructive"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        className="px-2 py-1 text-xs mb-4"
                        onClick={() => {
                          setSelectedResult({
                            id: result.id,
                            name: result.name,
                            description: result.description,
                            exam: result.exam,
                            examYear: result.exam_year,
                            rank: result.rank,
                            img: result.image_url,
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
                    colSpan={8}
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

      {/* Update Result Dialog */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Result</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="gap-3 grid sm:grid-cols-2">
            <Input
              name="name"
              value={selectedResult.name}
              onChange={(e) =>
                setSelectedResult({ ...selectedResult, name: e.target.value })
              }
              placeholder="Name"
              required
            />
            <Input
              name="description"
              value={selectedResult.description}
              onChange={(e) =>
                setSelectedResult({
                  ...selectedResult,
                  description: e.target.value,
                })
              }
              placeholder="Description"
              required
            />
            <Input
              name="exam"
              value={selectedResult.exam}
              onChange={(e) =>
                setSelectedResult({ ...selectedResult, exam: e.target.value })
              }
              placeholder="Exam"
              required
            />
            <Input
              name="examYear"
              value={selectedResult.examYear}
              onChange={(e) =>
                setSelectedResult({
                  ...selectedResult,
                  examYear: e.target.value,
                })
              }
              placeholder="Exam Year"
              required
            />
            <Input
              name="rank"
              value={selectedResult.rank}
              onChange={(e) =>
                setSelectedResult({ ...selectedResult, rank: e.target.value })
              }
              placeholder="Rank"
              required
            />
            <Input
              name="img"
              value={selectedResult.img}
              onChange={(e) =>
                setSelectedResult({ ...selectedResult, img: e.target.value })
              }
              placeholder="Image URL"
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

export default UpdateResult;
