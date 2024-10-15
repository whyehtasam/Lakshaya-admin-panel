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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Buttons from "../sidebar/Button";
import { toast, Toaster } from "sonner";
import DialogDemo from "@/components/DialogButton";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const UpdateBatch = () => {
  const [date, setDate] = useState(new Date());
  const [batches, setBatches] = useState([]);
  const [batchData, setBatchData] = useState({
    batchName: "",
    class: "",
    targetYear: "",
    fee: "",
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
    setBatchData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      batch_name: batchData.batchName,
      class: batchData.class,
      start_date: format(date, "dd-MM-yyyy"), // Format date to 'yyyy-MM-dd'
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
          toast.success("Batch updated successfully!", {
            duration: 3000,
          });
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
      fee: "",
    });
    setDate(new Date()); // Reset date to current date after submission
  };

  const handleDelete = async (id) => {
    const res = await fetch(backend_url + `/api/batches/remove?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (res.status === 200 || res.status === 201) {
      fetchBatches();
      toast.success("Batch deleted successfully!", {
        duration: 3000,
      });
    } else {
      toast.error("Failed to delete the batch. Please try again.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Update Batch</CardTitle>
          <CardDescription>Enter the batch details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3 ">
            <div className="gap-3 grid sm:grid-cols-2">
              <Input
                name="batchName"
                value={batchData.batchName}
                onChange={handleChange}
                placeholder="Batch Name"
              />
              <Select
                name="class"
                value={batchData.class}
                onValueChange={(value) =>
                  handleChange({ target: { name: "class", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Class</SelectLabel>
                    <SelectItem value="V (Foundation)">
                      V (Foundation)
                    </SelectItem>
                    <SelectItem value="VI (Foundation)">
                      VI (Foundation)
                    </SelectItem>
                    <SelectItem value="VII (Foundation)">
                      VII (Foundation)
                    </SelectItem>
                    <SelectItem value="VIII (Foundation)">
                      VIII (Foundation)
                    </SelectItem>
                    <SelectItem value="IX (Foundation)">
                      IX (Foundation)
                    </SelectItem>
                    <SelectItem value="X (Foundation)">
                      X (Foundation)
                    </SelectItem>
                    <SelectItem value="XI (JEE)">XI (JEE)</SelectItem>
                    <SelectItem value="XI (NEET)">XI (NEET)</SelectItem>
                    <SelectItem value="XII (JEE)">XII (JEE)</SelectItem>
                    <SelectItem value="XII (NEET)">XII (NEET)</SelectItem>
                    <SelectItem value="Dropper (JEE)">Dropper (JEE)</SelectItem>
                    <SelectItem value="Dropper (NEET)">
                      Dropper (NEET)
                    </SelectItem>{" "}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="gap-3 grid sm:grid-cols-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Input
                name="targetYear"
                value={batchData.targetYear}
                onChange={handleChange}
                placeholder="Year"
              />
              <Input
                name="fee"
                value={batchData.fee}
                onChange={handleChange}
                placeholder="Fee"
              />
            </div>

            <Buttons type="submit" className="w-fit">
              Submit
            </Buttons>
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
                <TableHead>S No.</TableHead>
                <TableHead>Batch Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Target Year</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.length > 0 ? (
                batches.map((batch, index) => (
                  <TableRow key={batch.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{batch.batch_name}</TableCell>
                    <TableCell>{batch.class}</TableCell>
                    <TableCell>{batch.start_date}</TableCell>
                    <TableCell>{batch.target_year}</TableCell>
                    <TableCell>{batch.fee}</TableCell>
                    <TableCell className="">
                      <DialogDemo
                        deleteFor="course"
                        onClick={() => handleDelete(batch.id)}
                        className=""
                        variant="destructive"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-sm text-muted-foreground text-center"
                  >
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
