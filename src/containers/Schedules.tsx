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
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlinePlus,
  AiOutlineSearch,
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
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledCollection, setScheduledCollection] = useState("");
  const [scheduledHrs, setScheduledHrs] = useState("");
  const [assignedCustomers, setAssignedCustomers] = useState("");
  const [scheduledIdForUpdate, setScheduledIdForUpdate] = useState<number>();
  const [employeeIdSearched, setEmployeeIdSearched] = useState<number>();

  const toast = useToast();

  const [searchEmpId, setSearchEmpId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const handleCheckAvailability = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/schedules/availability-check/${searchEmpId}/${selectedDate}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      setAvailability(data); // The API should return true or false
    } catch (error: any) {
      console.error("Error checking availability:", error);
      setAvailability(null);
      toast(toastAlertErr(error?.message || "Failed to check availability."));
    }
  };

  const handleCreateSchedule = () => {
    setIsModalOpen(true);
  };

  // Function to fetch schedules
  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;
      if (!parsedUser) {
        throw new Error("User not logged in");
      }

      const empIdToUse: number =
        parsedUser.role === "hrPerson" ? searchEmpId : parsedUser.empId;
      const response = await fetch(
        `${BACKEND_URL}/schedules/employee/${empIdToUse}`,
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

  const handleUpdate = (scheduleId: number) => {
    const scheduleToUpdate = schedules.find(
      (schedule) => schedule.scheduleId === scheduleId
    );
    if (scheduleToUpdate) {
      setScheduledDate(scheduleToUpdate.scheduledDate);
      setScheduledCollection(
        scheduleToUpdate.scheduledCollection?.toString() || ""
      );
      setScheduledHrs(scheduleToUpdate.scheduledHrs?.toString() || "");
      setAssignedCustomers(scheduleToUpdate.assignedCustomers || "");
      setScheduledIdForUpdate(scheduleId);
      setIsModalOpen(true);
    }
  };

  const handleSubmitUpdateSchedule = async (event: React.FormEvent) => {
    event.preventDefault();
    // ... (perform form validation if needed)

    const empIdToUse: number =
      parsedUser.role === "hrPerson" ? searchEmpId : parsedUser.empId;
    try {
      const requestBody = {
        empId: empIdToUse,
        scheduledDate,
        scheduledCollection: parseInt(scheduledCollection),
        scheduledHrs: parseInt(scheduledHrs),
        assignedCustomers,
      };

      // Replace `scheduleIdToUpdate` with the actual schedule ID to update
      const response = await fetch(
        `${BACKEND_URL}/schedules/${scheduledIdForUpdate}`,
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

      // Fetch schedules again to update the status
      fetchSchedules();

      toast(toastAlertSuccess("Schedule updated successfully."));
      setIsModalOpen(false); // Close the modal after successful update
    } catch (error: any) {
      console.error("Error updating schedule:", error);
      toast(toastAlertErr(error?.message || "Failed to update schedule."));
    }
  };

  const handleSubmitCreateSchedule = async (event: React.FormEvent) => {
    event.preventDefault();
    // ... ( form validation if needed)

    const empIdToUse: number = parsedUser.role === "hrPerson" ? searchEmpId : parsedUser.empId
    try {
      // Prepare the request body
      const requestBody = {
        empId: empIdToUse,
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
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Fetch schedules again to update the list
      fetchSchedules();

      toast(toastAlertSuccess("Schedule created successfully."));
      setIsModalOpen(false); // Close the modal after successful creation
    } catch (error: any) {
      console.error("Error creating schedule:", error);
      toast(toastAlertErr(error?.message || "Failed to create schedule."));
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

  // // Fetch schedules when the component mounts
  // useEffect(() => {
  //   fetchSchedules();
  // }, []);

  // Function to handle sorting button click
  const handleSort = (type: string) => {
    setSorting(type);
  };

  return (
    <Box p={4}>
      <Box mb={4} width={"40%"}>
        <Button
          colorScheme="teal"
          variant="link"
          onClick={() => setShowSearchBox(!showSearchBox)}
          mt={2}
          leftIcon={<AiOutlineSearch />}
          isDisabled={parsedUser?.role === "employee"}
        >
          Search Employee Availability
        </Button>
        {showSearchBox && (
          <FormControl mb={16}>
            <FormLabel>Employee ID</FormLabel>
            <Input
              type="text"
              placeholder="Employee ID"
              value={searchEmpId}
              onChange={(e) => setSearchEmpId(e.target.value)}
              size={"sm"}
            />
            <FormLabel mt={2}>Select Date</FormLabel>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              size={"sm"}
            />
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={handleCheckAvailability}
              mt={2}
              leftIcon={<AiOutlineSearch />}
              size={"sm"}
            >
              Check Availability
            </Button>
            {availability !== null && (
              <Box mt={2} color={availability ? "green.500" : "red.500"}>
                {availability
                  ? "Employee is available on the selected date."
                  : "Employee is not available on the selected date."}
              </Box>
            )}
          </FormControl>
        )}
      </Box>

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
          isDisabled={parsedUser?.role === "employee"}
        >
          Create Schedule
        </Button>
      </HStack>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {scheduledIdForUpdate ? "Update Schedule" : "Create Schedule"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={2}>
              <FormLabel>Scheduled Date</FormLabel>
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Scheduled Collection</FormLabel>
              <Input
                type="number"
                value={scheduledCollection}
                onChange={(e) => setScheduledCollection(e.target.value)}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Scheduled Hours</FormLabel>
              <Input
                type="number"
                value={scheduledHrs}
                onChange={(e) => setScheduledHrs(e.target.value)}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Assigned Customers</FormLabel>
              <Input
                type="text"
                value={assignedCustomers}
                onChange={(e) => setAssignedCustomers(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={
                scheduledIdForUpdate
                  ? handleSubmitUpdateSchedule
                  : handleSubmitCreateSchedule
              }
            >
              {scheduledIdForUpdate ? "Update" : "Create"}
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Schedules;
