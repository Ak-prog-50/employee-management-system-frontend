import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { BACKEND_URL } from "../config";

const CreateReport: React.FC = () => {
  const [empId, setEmpId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleCreateReport = async () => {
    if (!empId || !date) {
      toast({
        title: "Error",
        description: "Please enter both empId and date.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        empId: parseInt(empId),
        date,
      };

      const response = await fetch(`${BACKEND_URL}/target-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setLoading(false);

      toast({
        title: "Success",
        description: "Target report generated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error: any) {
      setLoading(false);
      console.error("Error generating target report:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to generate target report.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Box p={4}>
      <FormControl id="empId" mb={4}>
        <FormLabel>Employee ID</FormLabel>
        <Input
          type="number"
          placeholder="Enter Employee ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
      </FormControl>
      <FormControl id="date" mb={4}>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          placeholder="Enter Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="teal"
        isLoading={loading}
        onClick={handleCreateReport}
      >
        Generate Report
      </Button>
    </Box>
  );
};

export default CreateReport;
