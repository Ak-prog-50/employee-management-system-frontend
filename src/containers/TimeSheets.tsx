import React, { useEffect, useState } from "react";
import {
  useToast,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { BACKEND_URL } from "../config";

interface TimeSheet {
  status: string;
  timesheet_id: number;
  emp_id: number;
  week: number;
  worked_date: string;
  hrs: number;
  remarks: string;
  collectedAmount: number;
  createdAt: string;
  updatedAt: string;
}

const TimeSheets: React.FC = () => {
  const [timeSheets, setTimeSheets] = useState<TimeSheet[]>([]);
  const [sortedTimeSheets, setSortedTimeSheets] = useState<TimeSheet[]>([]);
  const [sorting, setSorting] = useState<string>(""); // Can be "pending", "approved", or "rejected"
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Function to fetch time sheets
  const fetchTimeSheets = async () => {
    try {
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;
      if (!parsedUser) {
        throw new Error("User not logged in");
      }

      const response = await fetch(
        `${BACKEND_URL}/timesheets/employee/${parsedUser.empId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setTimeSheets(data);
      setSortedTimeSheets(data);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching time sheets:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to fetch time sheets.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  // Sort time sheets based on the selected sorting type
  useEffect(() => {
    const sortTimeSheets = () => {
      if (sorting === "pending") {
        const toSet = timeSheets.filter((ts) => ts.status === "pending");
        setSortedTimeSheets(toSet);
      } else if (sorting === "approved") {
        const toSet = timeSheets.filter((ts) => ts.status === "approved");
        setSortedTimeSheets(toSet);
      } else if (sorting === "rejected") {
        const toSet = timeSheets.filter((ts) => ts.status === "rejected");
        setSortedTimeSheets(toSet);
      }
    };

    sortTimeSheets();
  }, [sorting]);

  // Fetch time sheets when the component mounts
  useEffect(() => {
    fetchTimeSheets();
  }, []);

  // Function to handle sorting button click
  const handleSort = (type: string) => {
    setSorting(type);
  };

  return (
    <Box p={4}>
      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Date</Th>
            <Th>Hours</Th>
            <Th>Remarks</Th>
            <Th>Collected Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={5} textAlign="center">
                Loading...
              </Td>
            </Tr>
          ) : timeSheets.length === 0 ? (
            <Tr>
              <Td colSpan={5} textAlign="center">
                No time sheets found.
              </Td>
            </Tr>
          ) : (
            sortedTimeSheets.map((timeSheet) => (
              <Tr key={timeSheet.timesheet_id}>
                <Td>{timeSheet.timesheet_id}</Td>
                <Td>{new Date(timeSheet.worked_date).toLocaleDateString()}</Td>
                <Td>{timeSheet.hrs}</Td>
                <Td>{timeSheet.remarks}</Td>
                <Td>{timeSheet.collectedAmount}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Box mt={4}>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => handleSort("pending")}
          mr={2}
          leftIcon={<AiOutlineArrowUp />}
        >
          Pending
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => handleSort("approved")}
          mr={2}
          leftIcon={<AiOutlineArrowDown />}
        >
          Approved
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => handleSort("rejected")}
          leftIcon={<AiOutlineArrowDown />}
        >
          Rejected
        </Button>
      </Box>
    </Box>
  );
};

export default TimeSheets;
