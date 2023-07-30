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
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlinePlus,
} from "react-icons/ai";
import { BACKEND_URL } from "../config";
import { toastAlertErr, toastAlertSuccess } from "../utils";

export interface ISchedule {
  scheduleId: number;
  empId: number;
  scheduledDate: string;
  scheduledCollection?: number;
  scheduledHrs?: number;
  assignedCustomers?: string;
  status: "pending" | "approved" | "rejected" | "completed"; // Enumerate all possible values
}

const Schedules: React.FC = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [sortedSchedules, setSortedSchedules] = useState<ISchedule[]>([]);
  const [sorting, setSorting] = useState<string>(""); // Can be "pending", "approved", or "rejected"
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Function to fetch schedules
  const fetchSchedules = async () => {
    try {
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;
      if (!parsedUser) {
        throw new Error("User not logged in");
      }

      const response = await fetch(
        `${BACKEND_URL}/schedules/employee/${parsedUser.empId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSchedules(data);
      setSortedSchedules(data);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching schedules:", error);
      toast(toastAlertErr(error?.message || "Failed to fetch schedules."));
      setLoading(false);
    }
  };

  const handleCreateSchedule = async () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    try {
      // Prompt the user to enter the details for the new schedule
      const scheduledDate =
        window.prompt("Enter the scheduled date (YYYY-MM-DD):") || "";
      const scheduledCollection =
        window.prompt("Enter the scheduled collection:") || "";
      const scheduledHrs = window.prompt("Enter the scheduled hours:") || "";
      const assignedCustomers =
        window.prompt("Enter the assigned customers:") || "";

      // Prepare the request body
      const requestBody = {
        empId: parsedUser.empId,
        scheduledDate,
        scheduledCollection: parseInt(scheduledCollection),
        scheduledHrs: parseInt(scheduledHrs),
        assignedCustomers,
      };

      const response = await fetch(`${BACKEND_URL}/schedules`, {
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

      // Fetch schedules again to update the list
      fetchSchedules();

      toast(toastAlertSuccess("Schedule created successfully."));
    } catch (error: any) {
      console.error("Error creating schedule:", error);
      toast(toastAlertErr(error?.message || "Failed to create schedule."));
    }
  };

  const handleUpdate = async (scheduleId: number) => {
    // const user = localStorage.getItem("user");
    // const parsedUser = user ? JSON.parse(user) : null;
    const scheduledDate =
      window.prompt("Enter the scheduled date (YYYY-MM-DD):") || "";
    const scheduledCollection =
      window.prompt("Enter the scheduled collection:") || "";
    const scheduledHrs = window.prompt("Enter the scheduled hours:") || "";
    const assignedCustomers =
      window.prompt("Enter the assigned customers:") || "";

    const requestBody = {
      empId: parsedUser.empId,
      scheduledDate,
      scheduledCollection: parseInt(scheduledCollection),
      scheduledHrs: parseInt(scheduledHrs),
      assignedCustomers,
      //   status: "pending",
    };

    try {
      const response = await fetch(`${BACKEND_URL}/schedules/${scheduleId}`, {
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

      // Fetch schedules again to update the status
      fetchSchedules();

      toast(toastAlertSuccess("Schedule updated successfully."));
    } catch (error: any) {
      console.error("Error updating schedule:", error);
      toast(toastAlertErr(error?.message || "Failed to update schedule."));
    }
  };

  // Sort schedules based on the selected sorting type
  useEffect(() => {
    const sortSchedules = () => {
      if (sorting === "pending") {
        const toSet = schedules.filter((ts) => ts.status === "pending");
        setSortedSchedules(toSet);
      } else if (sorting === "approved") {
        const toSet = schedules.filter((ts) => ts.status === "approved");
        setSortedSchedules(toSet);
      } else if (sorting === "rejected") {
        const toSet = schedules.filter((ts) => ts.status === "rejected");
        setSortedSchedules(toSet);
      }
    };

    sortSchedules();
  }, [sorting]);

  // Fetch schedules when the component mounts
  useEffect(() => {
    fetchSchedules();
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
            <Th>Scheduled Date</Th>
            <Th>Scheduled Hours</Th>
            <Th>Assigned Customers</Th>
            <Th>Scheduled Amount</Th>
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
          ) : schedules.length === 0 ? (
            <Tr>
              <Td colSpan={6} textAlign="center">
                No schedules found.
              </Td>
            </Tr>
          ) : (
            sortedSchedules.map((schedule) => (
              <Tr key={schedule.scheduleId}>
                <Td>{schedule.scheduleId}</Td>
                <Td>{new Date(schedule.scheduledDate).toLocaleDateString()}</Td>
                <Td>{schedule.scheduledHrs}</Td>
                <Td>{schedule.assignedCustomers}</Td>
                <Td>{schedule.scheduledCollection}</Td>
                <Td>
                  {schedule.status === "rejected" ||
                  schedule.status === "pending" ? (
                    <Button
                      colorScheme="yellow"
                      variant="link"
                      size="sm"
                      onClick={() => handleUpdate(schedule.scheduleId)}
                      isDisabled={parsedUser?.role === "employee"}
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
          onClick={handleCreateSchedule}
          leftIcon={<AiOutlinePlus />}
          ml={"auto"}
          isDisabled={parsedUser?.role === "employee" }
        >
          Create Schedule
        </Button>
      </HStack>
    </Box>
  );
};

export default Schedules;
