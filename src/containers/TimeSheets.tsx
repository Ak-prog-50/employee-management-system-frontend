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
  HStack,
} from "@chakra-ui/react";
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlinePlus } from "react-icons/ai";
import { BACKEND_URL } from "../config";
import { toastAlertErr, toastAlertSuccess } from "../utils";

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
      toast(toastAlertErr(error?.message || "Failed to fetch time sheets."));
      setLoading(false);
    }
  };

  const handleCreateTimesheet = async () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    try {
      // Prompt the user to enter the details for the new timesheet
      const workedDate =
        window.prompt("Enter the worked date (YYYY-MM-DD):") || "";
      const hrs = window.prompt("Enter the hours worked:") || "";
      const remarks = window.prompt("Enter remarks:") || "";
      const collectedAmount =
        window.prompt("Enter the collected amount:") || "";

      // Prepare the request body
      const requestBody = {
        emp_id: parsedUser.empId, // Replace this with the actual emp_id from the user object in localStorage
        worked_date: workedDate,
        hrs: parseInt(hrs),
        week: 0,
        remarks,
        collectedAmount: parseInt(collectedAmount),
      };

      const response = await fetch(`${BACKEND_URL}/timesheets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody), // Convert the requestBody to JSON
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Fetch time sheets again to update the list
      fetchTimeSheets();

      toast(toastAlertSuccess("Timesheet created successfully."));
    } catch (error: any) {
      console.error("Error creating timesheet:", error);
      toast(toastAlertErr(error?.message || "Failed to create timesheet."));
    }
  };

  const handleUpdate = async (timesheetId: number) => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const collectedAmount = window.prompt("Enter the collected amount:") || "";
    const remarks = window.prompt("Enter remarks:") || "";
    const workedDate = window.prompt("Enter worked date (YYYY-MM-DD):") || "";
    const workedHrs = window.prompt("Enter worked hrs:") || "";

    const requestBody = {
      timesheet_id: timesheetId,
      emp_id: parsedUser.empId,
      week: 0,
      worked_date: workedDate,
      hrs: parseInt(workedHrs),
      collectedAmount: parseInt(collectedAmount),
      remarks: remarks,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/timesheets/${timesheetId}`, {
        method: "PUT",
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

      // Fetch time sheets again to update the status
      fetchTimeSheets();

      toast(toastAlertSuccess("Time sheet updated successfully."));
    } catch (error: any) {
      console.error("Error updating time sheet:", error);
      toast(toastAlertErr(error?.message || "Failed to update time sheet."));
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
            <Th>Action</Th> {/* New column for Action */}
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={6} textAlign="center">
                Loading...
              </Td>
            </Tr>
          ) : timeSheets.length === 0 ? (
            <Tr>
              <Td colSpan={6} textAlign="center">
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
                <Td>
                  {timeSheet.status === "rejected" ||
                  timeSheet.status === "pending" ? (
                    <Button
                      colorScheme="yellow"
                      variant="link"
                      size="sm"
                      onClick={() => handleUpdate(timeSheet.timesheet_id)}
                    >
                      Update
                    </Button>
                  ) : null}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <HStack mt={4} spacing={1}>
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
        <Button
          colorScheme="orange"
          variant="solid"
          onClick={handleCreateTimesheet}
          leftIcon={<AiOutlinePlus />}
          ml={'auto'}
        >
          Create Timesheet
        </Button>
      </HStack>
    </Box>
  );
};

export default TimeSheets;
