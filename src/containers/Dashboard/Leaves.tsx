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
} from "@chakra-ui/react";

const LeaveForm = ({ isOpen, onClose }: any) => {
  const requestLeave = async (leaveDetails: any) => {
    try {
      const response = await fetch("/leaves/request-leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leaveObj: {
            leaveId: null,
            empId: leaveDetails.empId, // Use the empId from leaveDetails
            startDate: leaveDetails.startDate, // Use the startDate from leaveDetails
            endDate: leaveDetails.endDate, // Use the endDate from leaveDetails
            status: "pending",
            leaveType: leaveDetails.leaveType, // Convert the leaveType string to enum value
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
            <Select placeholder="Select Leave Type">
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Annual Leave</option>
              <option>Duty Leave</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>From Date</FormLabel>
            <Input placeholder="Select Date" size="md" type="date" />{" "}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>To Date</FormLabel>
            <Input placeholder="Select Date" size="md" type="date" />{" "}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => requestLeave(null)}
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

const Leaves = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction={"column"} width={"80%"} m={"auto"}>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                {/* <Th>Leave Code</Th> */}
                <Th>Leave Description</Th>
                <Th isNumeric>Entitled Leaves</Th>
                <Th isNumeric>Taken Leaves</Th>
                <Th isNumeric>Balance</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                {/* <Td>CL</Td> */}
                <Td>Casual Leaves</Td>
                <Td isNumeric>30</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                {/* <Td>CL</Td> */}
                <Td>Casual Leaves</Td>
                <Td isNumeric>30</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                {/* <Td>CL</Td> */}
                <Td>Casual Leaves</Td>
                <Td isNumeric>30</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                {/* <Td>CL</Td> */}
                <Td>Casual Leaves</Td>
                <Td isNumeric>30</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
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
      </Flex>
      <LeaveForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Leaves;
