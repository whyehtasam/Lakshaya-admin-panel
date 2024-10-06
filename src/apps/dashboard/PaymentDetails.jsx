import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
      const backend_url = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      const response = await fetch(`${backend_url}/api/payment/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch payment details");
      }

      const data = await response.json();
      setPayments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      setError(error.message);
      setLoading(false);
      toast.error("Failed to load payment details. Please try again.");
    }
  };

  return (
    <div className="h-full">
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>View all payment details</CardDescription>
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
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Father's Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Stream</TableHead>
                  <TableHead>Batch</TableHead>
                  {/* <TableHead>Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell>{payment.contact}</TableCell>
                      <TableCell>{payment.email}</TableCell>
                      <TableCell>{payment.fathers_name}</TableCell>
                      <TableCell>{payment.student_id}</TableCell>
                      <TableCell>{payment.year}</TableCell>
                      <TableCell>{payment.stream}</TableCell>
                      <TableCell>{payment.batch}</TableCell>
                      {/* <TableCell className="align-top">
                        <DialogDemo
                          deleteFor="registered student"
                          onClick={""}
                          className=""
                          variant="destructive"
                        />
                      </TableCell> */}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No payment details found
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

export default PaymentDetails;