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

const ReviewTimeSheets: React.FC = () => {
  const [timesheets, setTimesheets] = useState<TimeSheet[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleApproveTimeSheet = async (timesheetId: number) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/timesheets/approve/${timesheetId}`,
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
        alert("Timesheet Approved!");
        // You can also refresh the list of timesheets after approval if needed
      } else {
        // Approval failed, handle error cases
        alert(data.message);
      }
    } catch (error) {
      console.error("Timesheet approval failed due to an error", error);
      alert("Timesheet approval failed");
    }
  };

  const handleRejectTimeSheet = async (timesheetId: number) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/timesheets/reject/${timesheetId}`,
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
        alert("Timesheet Rejected!");
        // You can also refresh the list of timesheets after rejection if needed
      } else {
        // Rejection failed, handle error cases
        alert(data.message);
      }
    } catch (error) {
      console.error("Timesheet rejection failed due to an error", error);
      alert("Timesheet rejection failed");
    }
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/timesheets`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setTimesheets(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching timesheets.");
        console.error("Error while fetching timesheets", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (timesheets && timesheets.length === 0) {
    return <div>No Timesheets found.</div>;
  }

  return (
    <Stack spacing="4">
      {timesheets?.map((timesheet: TimeSheet, index: number) => (
        <Card key={index} variant="elevated">
          <CardHeader>
            <Heading size="md">Timesheet Id #{timesheet.timesheet_id}</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={0} mr={"18rem"}>
              <GridItem colSpan={1}>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={MdPermIdentity} color="green.500" />
                    Employer Id: {timesheet.emp_id}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdDateRange} color="green.500" />
                    Work Date:{" "}
                    {new Date(timesheet.worked_date).toLocaleDateString()}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdDateRange} color="green.500" />
                    Remarks : {timesheet.remarks}
                  </ListItem>
                </List>
              </GridItem>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdDateRange} color="green.500" />
                  Hours : {timesheet.hrs}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdDateRange} color="green.500" />
                  Collected Amount : {timesheet.collectedAmount}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdPending} color="green.500" />
                  Timesheet Status: {timesheet.status}
                </ListItem>
              </List>{" "}
            </Grid>

            {/* Buttons for Approve and Reject */}
            <Stack direction="row" justifyContent="flex-end" mt="4">
              <Button
                colorScheme="green"
                variant="outline"
                onClick={() => handleApproveTimeSheet(timesheet.timesheet_id)}
              >
                Approve
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => handleRejectTimeSheet(timesheet.timesheet_id)}
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

export default ReviewTimeSheets;
