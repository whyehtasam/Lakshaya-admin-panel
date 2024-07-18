import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  // Card,
  // CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
  // Input,
  // Label,
} from "@/components/ui/button";

import {
  // Button,
  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent
  // CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
  // Input,
  // Label,
} from "@/components/ui/card";


import {
  // Button,
  // Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent
  // CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
  // Input,
  Label
} from "@/components/ui/label";
import {
  // Button,
  // Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent
  // CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
  Input
} from "@/components/ui/input";

export default function LoginForm() {
  const [adminid, setadminid] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(backend_url+"/api/admin/signin", { adminid, password ,passcode:password});
      const { token } = response.data;
      localStorage.setItem("token", token); // Store the token
      // Redirect or do something upon successful login
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error.response.data);
      
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <form onSubmit={handleLogin}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your adminid below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="adminid">Username</Label>
            <Input
              id="adminid"
              type="text"
              placeholder="admin@gmail.com"
              required
              value={adminid}
              onChange={(e) => setadminid(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="Admin123.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Log in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
