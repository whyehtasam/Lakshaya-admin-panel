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

const UpdateResult = () => {
  const [formData, setFormData] = useState({
    name: "",
    exam: "",
    examYear: "",
    description: "",
    rank: "",
    img: "",
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResults([...results, formData]);
    setFormData({
      name: "",
      exam: "",
      examYear: "",
      description: "",
      rank: "",
      img: "",
    });
  };

  return (
    <div className="h-full">
    <Card className='h-full overflow-auto'>
        <CardHeader>
          <CardTitle>Update Result</CardTitle>
          <CardDescription>Enter the result details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="gap-3 grid grid-cols-2">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
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
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
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
            <Button type="submit" className='w-fit'>Update</Button>
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
                <TableHead>Name</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length > 0 ? (
                results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.name}</TableCell>
                    <TableCell>{result.exam}</TableCell>
                    <TableCell>{result.examYear}</TableCell>
                    <TableCell>{result.description}</TableCell>
                    <TableCell>{result.rank}</TableCell>
                    <TableCell>
                      <img
                        src={result.img}
                        alt={result.name}
                        width="50"
                        height="50"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-sm text-muted-foreground">No results found</TableCell>
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
