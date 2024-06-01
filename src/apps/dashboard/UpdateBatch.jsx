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

const UpdateBatch = () => {
  const [batches, setBatches] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const batch = Object.fromEntries(formData.entries());
    setBatches([...batches, batch]);
    e.target.reset();
  };

  return (
    <div className="h-full">
    <Card className='h-full overflow-auto'>
        <CardHeader>
          <CardTitle>Update Batch</CardTitle>
          <CardDescription>Enter the batch details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="gap-3 grid grid-cols-2">
            <Input name="batchName" placeholder="Batch Name" />
            <Input name="class" placeholder="Class" />
            <Input name="targetYear" placeholder="Target Year" />
            <Input name="fee" placeholder="Fee" />
            <Button type="submit" className='w-fit'>Submit</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Target Year</TableHead>
                <TableHead>Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.length > 0 ? (
                batches.map((batch, index) => (
                  <TableRow key={index}>
                    <TableCell>{batch.batchName}</TableCell>
                    <TableCell>{batch.class}</TableCell>
                    <TableCell>{batch.targetYear}</TableCell>
                    <TableCell>{batch.fee}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No batches found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateBatch;