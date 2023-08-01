import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Icon,
  Text,
  Box,
} from "@chakra-ui/react";
import { BACKEND_URL } from "../config";
import { AiOutlineArrowUp } from "react-icons/ai";

interface LeaveDetails {
  empId: number;
  startDate: string;
  endDate: string;
  leaveType: string;
}

const LeaveForm = ({ isOpen, onClose }: any) => {
  const [leaveDetails, setLeaveDetails] = useState<LeaveDetails>({
    empId: 0,
    startDate: "",
    endDate: "",
    leaveType: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setLeaveDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const requestLeave = async (leaveDetails: LeaveDetails) => {
    try {
      const response = await fetch(`${BACKEND_URL}/leaves/request-leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          leaveObj: {
            leaveId: null,
            empId: leaveDetails.empId,
            startDate: leaveDetails.startDate,
            endDate: leaveDetails.endDate,
            status: "pending",
            leaveType: leaveDetails.leaveType,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }

      alert("Leave request submitted successfully!");

      // const responseData = await response.json();
      // return responseData;
    } catch (error) {
      console.error("Error requesting leave:", error);
      alert("Error requesting leave");
    }
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request Leave</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Type Of Leave</FormLabel>
            <Select
              name="leaveType"
              placeholder="Select Leave Type"
              onChange={handleChange}
              value={leaveDetails.leaveType}
            >
              <option value="casual">Casual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="annual">Annual Leave</option>
              <option value="duty">Duty Leave</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>From Date</FormLabel>
            <Input
              name="startDate"
              placeholder="Select Date"
              size="md"
              type="date"
              onChange={handleChange}
              value={leaveDetails.startDate}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>To Date</FormLabel>
            <Input
              name="endDate"
              placeholder="Select Date"
              size="md"
              type="date"
              onChange={handleChange}
              value={leaveDetails.endDate}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => requestLeave(leaveDetails)}
            >
              Request
            </Button>
            <Button colorScheme="orange" onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface UserLeaveData {
  entitLeaves: number;
  takenLeaves: number;
  casualLeavesBalance: number;
  sickLeavesBalance: number;
  annualLeavesBalance: number;
  dutyLeavesBalance: number;
  startDate: Date;
  endDate: Date;
  status: "pending" | "approved" | "rejected";
}

const Leaves = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userLeaveData, setUserLeaveData] = useState<UserLeaveData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const [previousLeaves, setPreviousLeaves] = useState<any[]>([]);

  useEffect(() => {
    // Fetch user's leave data from the server
    fetch(`${BACKEND_URL}/user/get-user/${parsedUser?.empId}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setUserLeaveData(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching user's leave data.");
        console.error("Error while fetching user's leave data", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch previous leaves from the server
    fetch(`${BACKEND_URL}/leaves`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Your Leaves are fetched.") {
          setPreviousLeaves(data.data);
        }
      })
      .catch((error) => {
        console.error("Error while fetching previous leaves:", error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const leaves = [
    {
      id: 1,
      description: "Casual Leaves",
      // entitledLeaves: userLeaveData?.entitLeaves || 0,
      // takenLeaves: userLeaveData?.takenLeaves || 0,
      balance: userLeaveData?.casualLeavesBalance || 0,
    },
    {
      id: 2,
      description: "Sick Leaves",
      // entitledLeaves: userLeaveData?.entitLeaves || 0,
      // takenLeaves: userLeaveData?.takenLeaves || 0,
      balance: userLeaveData?.sickLeavesBalance || 0,
    },
    {
      id: 3,
      description: "Annual Leaves",
      // entitledLeaves: userLeaveData?.entitLeaves || 0,
      // takenLeaves: userLeaveData?.takenLeaves || 0,
      balance: userLeaveData?.annualLeavesBalance || 0,
    },
    {
      id: 4,
      description: "Duty Leaves",
      // entitledLeaves: userLeaveData?.entitLeaves || 0,
      // takenLeaves: userLeaveData?.takenLeaves || 0,
      balance: userLeaveData?.dutyLeavesBalance || 0,
    },
  ];

  return (
    <>
      <Flex direction={"column"} width={"80%"} m={"auto"}>
        {/* Display Entitled and Taken Leaves */}
        <Box mb={4}>
          <Text>Total Entitled Leaves: {userLeaveData?.entitLeaves}</Text>
          <Text>Total Taken Leaves: {userLeaveData?.takenLeaves}</Text>
        </Box>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Leave Description</Th>
                {/* <Th isNumeric>Entitled Leaves</Th>
                <Th isNumeric>Taken Leaves</Th> */}
                <Th isNumeric>Balance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaves.map((leave) => (
                <Tr key={leave.id}>
                  <Td>{leave.description}</Td>
                  {/* <Td isNumeric>{leave.entitledLeaves}</Td>
                  <Td isNumeric>{leave.takenLeaves}</Td> */}
                  <Td isNumeric>{leave.balance}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Button
          colorScheme="teal"
          variant="outline"
          mt={4}
          width={"35%"}
          alignSelf={"center"}
          onClick={onOpen}
        >
          Request Leave
        </Button>

        {/* Table to display previous leaves */}
        <Heading mt={4} mb={4} fontSize={"2xl"}>
          <Icon as={AiOutlineArrowUp} mr={2} color={"teal.500"} /> Previous
          Leaves
        </Heading>
        <TableContainer mt={4}>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {previousLeaves.map((leave) => (
                <Tr key={leave.leaveId}>
                  <Td>{new Date(leave.startDate).toLocaleDateString()}</Td>
                  <Td>{new Date(leave.endDate).toLocaleDateString()}</Td>
                  <Td>{leave.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <LeaveForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Leaves;
