import React, { useState, useEffect } from "react";
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

const UpdateBatch = () => {
  const [batches, setBatches] = useState([]);
  const [batchData, setBatchData] = useState({
    batchName: "",
    class: "",
    targetYear: "",
    fee: ""
  });

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  // Function to fetch batches from the API
  const fetchBatches = () => {
    fetch(backend_url + "/api/batches/get", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setBatches(data.reverse())) // Reverse the order to show latest first
      .catch((e) => console.log(e));
  };

  // Fetch batches on component mount
  useEffect(() => {
    fetchBatches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatchData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      batch_name: batchData.batchName,
      class: batchData.class,
      target_year: batchData.targetYear,
      fee: batchData.fee,
    };

    fetch(backend_url + "/api/batches/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Batch added successfully");
          toast.success("Batch updated successfully!",{
            duration: 3000,
          })
          fetchBatches(); // Fetch batches immediately after submission
        } else {
          console.error("Batch addition failed");
        }
      })
      .catch((e) => console.log(e));

    setBatchData({
      batchName: "",
      class: "",
      targetYear: "",
      fee: ""
    });
  };

  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Update Batch</CardTitle>
          <CardDescription>Enter the batch details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="gap-3 grid sm:grid-cols-2">
            <Input name="batchName" value={batchData.batchName} onChange={handleChange} placeholder="Batch Name" />
            <Input name="class" value={batchData.class} onChange={handleChange} placeholder="Class" />
            <Input name="targetYear" value={batchData.targetYear} onChange={handleChange} placeholder="Year" />
            <Input name="fee" value={batchData.fee} onChange={handleChange} placeholder="Fee" />
            <Button type="submit" className="w-fit">Submit</Button>
            <Toaster richColors />
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start space-y-2 mt-5">
          <CardTitle>Batch Details</CardTitle>
          <CardDescription>
            View batch details for a specific batch 
          </CardDescription>
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
                    <TableCell>{batch.batch_name}</TableCell>
                    <TableCell>{batch.class}</TableCell>
                    <TableCell>{batch.target_year}</TableCell>
                    <TableCell>{batch.fee}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-sm text-muted-foreground text-center">
                    No batches found
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

export default UpdateBatch;
