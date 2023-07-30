import { useState, useEffect } from "react";
import {
  Stack,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Grid,
  GridItem,
  Button,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { MdDateRange, MdPermIdentity, MdPending, MdTimeToLeave } from "react-icons/md";
import { BACKEND_URL } from "../config";

interface Leave {
  leaveId: number;
  empId: number;
  leaveType: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

const ReviewLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleApproveLeave = async (leaveId: number) => {
    try {
      const response = await fetch(`${BACKEND_URL}/leaves/approve-leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          leaveId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Leave Approved!");
        // You can also refresh the list of leaves after approval if needed
      } else {
        // Approval failed, handle error cases
        alert(data.message);
      }
    } catch (error) {
      console.error("Leave approval failed due to an error", error);
      alert("Leave approval failed");
    }
  };

  const handleRejectLeave = async (leaveId: number) => {
    try {
      const response = await fetch(`${BACKEND_URL}/leaves/reject-leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          leaveId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Leave Rejected!");
        // You can also refresh the list of leaves after rejection if needed
      } else {
        // Rejection failed, handle error cases
        alert(data.message);
      }
    } catch (error) {
      console.error("Leave rejection failed due to an error", error);
      alert("Leave rejection failed");
    }
  };

  useEffect(() => {
    // Fetch all leaves from the server
    fetch(`${BACKEND_URL}/leaves`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setLeaves(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching leaves.");
        console.error("Error while fetching leaves", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (leaves.length === 0) {
    return <div>No leaves found.</div>;
  }

  return (
    <Stack spacing="4">
      {leaves.map((leave: Leave, index: number) => (
        <Card key={index} variant="elevated">
          <CardHeader>
            <Heading size="md">Leave Request #{leave.leaveId}</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={0} mr={"18rem"}>
              <GridItem colSpan={1}>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={MdPermIdentity} color="green.500" />
                    Employer Id: {leave.empId}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdDateRange} color="green.500" />
                    Start Date: {new Date(leave.startDate).toLocaleDateString()}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdDateRange} color="green.500" />
                    End Date: {new Date(leave.endDate).toLocaleDateString()}
                  </ListItem>
                </List>
              </GridItem>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdPending} color="green.500" />
                  Leave Status: {leave.status}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdTimeToLeave} color="green.500" />
                  Leave Type: {leave.leaveType}
                </ListItem>
              </List>{" "}
            </Grid>

            {/* Buttons for Approve and Reject */}
            <Stack direction="row" justifyContent="flex-end" mt="4">
              <Button
                colorScheme="green"
                variant="outline"
                onClick={() => handleApproveLeave(leave.leaveId)}
              >
                Approve
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => handleRejectLeave(leave.leaveId)}
              >
                Reject
              </Button>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
};

export default ReviewLeaves;
