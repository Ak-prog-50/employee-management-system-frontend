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
import { MdDateRange, MdPermIdentity, MdPending } from "react-icons/md";
import { BACKEND_URL } from "../config";
import { ISchedule } from "./Schedules";

const ReviewSchedules: React.FC = () => {
  const [schedules, setSchedules] = useState<ISchedule[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleApproveSchedule = async (scheduleId: number) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/schedules/approve/${scheduleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Schedule Approved!");
        // You can also refresh the list of schedules after approval if needed
      } else {
        // Approval failed, handle error cases
        alert(data.message);
      }
    } catch (error) {
      console.error("Schedule approval failed due to an error", error);
      alert("Schedule approval failed");
    }
  };

  const handleRejectSchedule = async (scheduleId: number) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/schedules/reject/${scheduleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Schedule Rejected!");
        // You can also refresh the list of schedules after rejection if needed
      } else {
        // Rejection failed, handle error cases
        alert(data.message);
      }
    } catch (error) {
      console.error("Schedule rejection failed due to an error", error);
      alert("Schedule rejection failed");
    }
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/schedules`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setSchedules(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching schedules.");
        console.error("Error while fetching schedules", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (schedules && schedules.length === 0) {
    return <div>No Schedules found.</div>;
  }

  return (
    <Stack spacing="4">
      {schedules?.map((schedule: ISchedule, index: number) => (
        <Card key={index} variant="elevated">
          <CardHeader>
            <Heading size="md">Schedule Id #{schedule.scheduleId}</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={0} mr={"18rem"}>
              <GridItem colSpan={1}>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={MdPermIdentity} color="green.500" />
                    Employer Id: {schedule.empId}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdDateRange} color="green.500" />
                    Scheduled Date:{" "}
                    {new Date(schedule.scheduledDate).toLocaleDateString()}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdDateRange} color="green.500" />
                    Assigned Customers : {schedule.assignedCustomers}
                  </ListItem>
                </List>
              </GridItem>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdDateRange} color="green.500" />
                  Scheduled Hours : {schedule.scheduledHrs}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdDateRange} color="green.500" />
                  Scheduled Amount : {schedule.scheduledCollection}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdPending} color="green.500" />
                  Schedule Status: {schedule.status}
                </ListItem>
              </List>{" "}
            </Grid>

            {/* Buttons for Approve and Reject */}
            <Stack direction="row" justifyContent="flex-end" mt="4">
              <Button
                colorScheme="green"
                variant="outline"
                onClick={() => handleApproveSchedule(schedule.scheduleId)}
              >
                Approve
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => handleRejectSchedule(schedule.scheduleId)}
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

export default ReviewSchedules;
