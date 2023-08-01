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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlinePlus,
} from "react-icons/ai";
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
  const [showCreateModal, setShowCreateModal] = useState(false); // State to control the visibility of the create modal
  const [hoursWorked, setHoursWorked] = useState<string>("");
  const [workedDate, setWorkedDate] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [collectedAmount, setCollectedAmount] = useState<string>("");
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State to control the visibility of the update modal
  const [updateTimesheetId, setUpdateTimesheetId] = useState<number | null>(
    null
  );
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

  const handleCreateTimesheet = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    try {
      // Prepare the request body from the form fields
      const requestBody = {
        emp_id: parsedUser.empId, // Replace this with the actual emp_id from the user object in localStorage
        worked_date: workedDate,
        hrs: parseInt(hoursWorked),
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

      // Close the create form after successful submission
      setShowCreateModal(false);
    } catch (error: any) {
      console.error("Error creating timesheet:", error);
      toast(toastAlertErr(error?.message || "Failed to create timesheet."));
    }
  };

  const handleSubmitUpdateTimesheet = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    try {
      if (!updateTimesheetId) {
        throw new Error("Timesheet ID is missing for update.");
      }

      // Prepare the request body from the form fields
      const requestBody = {
        timesheet_id: updateTimesheetId,
        emp_id: parsedUser?.empId,
        worked_date: workedDate,
        hrs: parseInt(hoursWorked),
        collectedAmount: parseInt(collectedAmount),
        remarks: remarks,
      };

      const response = await fetch(
        `${BACKEND_URL}/timesheets/${updateTimesheetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Fetch time sheets again to update the status
      fetchTimeSheets();

      toast(toastAlertSuccess("Time sheet updated successfully."));

      // Close the update form after successful submission
      setShowUpdateModal(false);
    } catch (error: any) {
      console.error("Error updating time sheet:", error);
      toast(toastAlertErr(error?.message || "Failed to update time sheet."));
    }
  };

  const handleUpdate = async (timesheetId: number) => {
    setUpdateTimesheetId(timesheetId);
    setShowUpdateModal(true);
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
          onClick={() => setShowCreateModal(true)}
          leftIcon={<AiOutlinePlus />}
          ml={"auto"}
        >
          Create Timesheet
        </Button>
      </HStack>

      {/* Create Timesheet Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Timesheet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleCreateTimesheet}>
              <FormControl mb={2}>
                <FormLabel>Worked Date</FormLabel>
                <Input
                  type="date"
                  value={workedDate}
                  onChange={(e) => setWorkedDate(e.target.value)}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Hours Worked</FormLabel>
                <Input
                  type="number"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Remarks</FormLabel>
                <Input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Collected Amount</FormLabel>
                <Input
                  type="number"
                  value={collectedAmount}
                  onChange={(e) => setCollectedAmount(e.target.value)}
                />
              </FormControl>
              <ModalFooter>
                <Button
                  colorScheme="teal"
                  mr={3}
                  onClick={() => setShowCreateModal(false)}
                >
                  Close
                </Button>
                <Button colorScheme="orange" type="submit">
                  Create Timesheet
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Update Timesheet Modal */}
      <Modal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Timesheet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmitUpdateTimesheet}>
              <FormControl mb={2}>
                <FormLabel>Worked Date</FormLabel>
                <Input
                  type="date"
                  value={workedDate}
                  onChange={(e) => setWorkedDate(e.target.value)}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Hours Worked</FormLabel>
                <Input
                  type="number"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Remarks</FormLabel>
                <Input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Collected Amount</FormLabel>
                <Input
                  type="number"
                  value={collectedAmount}
                  onChange={(e) => setCollectedAmount(e.target.value)}
                />
              </FormControl>
              <ModalFooter>
                <Button
                  colorScheme="teal"
                  mr={3}
                  onClick={() => setShowUpdateModal(false)}
                >
                  Close
                </Button>
                <Button colorScheme="orange" type="submit">
                  Update Timesheet
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TimeSheets;
