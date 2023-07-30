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
import {
  MdPhone,
  MdEmail,
  MdWork,
  MdHome,
  MdCake,
  MdDateRange,
} from "react-icons/md";
import { BACKEND_URL } from "../config";

interface RegistrantDetails {
  name: string;
  contactNo: string;
  email: string;
  designation: string;
  address: string;
  dob: string;
  appDate: string;
}

const ReviewRegistrationReq: React.FC = () => {
  const [registrationRequests, setRegistrationRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleRegistration = async (regDetails: RegistrantDetails) => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    try {
      const response = await fetch(`${BACKEND_URL}/user/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          empIdOfCaller: parsedUser.empId,
          registrantDetails: regDetails,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Request Approved!");
      } else {
        // Registration failed, handle error cases
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration failed due to an error", error);
      alert("Registration failed");
    }
  };

  useEffect(() => {
    // Fetch registration requests from the server
    fetch(`${BACKEND_URL}/registration-requests`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setRegistrationRequests(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching registration requests.");
        console.error("error while fetching requests", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (registrationRequests.length === 0) {
    return <div>No registration requests found.</div>;
  }

  return (
    <Stack spacing="4">
      {registrationRequests.map((request: any, index: number) => (
        <Card key={index} variant="elevated">
          <CardHeader>
            <Heading size="md">{request.name}</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={0} mr={"18rem"}>
              <GridItem colSpan={1}>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={MdPhone} color="green.500" />
                    Contact Number: {request.contactNo}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdEmail} color="green.500" />
                    Email: {request.email}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdWork} color="green.500" />
                    Designation: {request.designation}
                  </ListItem>
                </List>
              </GridItem>
              <GridItem colSpan={1}>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={MdHome} color="green.500" />
                    Address: {request.address}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCake} color="green.500" />
                    Date of Birth: {new Date(request.dob).toLocaleDateString()}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdDateRange} color="green.500" />
                    Application Date:{" "}
                    {new Date(request.appDate).toLocaleDateString()}
                  </ListItem>
                </List>
              </GridItem>
            </Grid>

            {/* Buttons for Approve and Reject */}
            <Stack direction="row" justifyContent="flex-end" mt="4">
              <Button
                colorScheme="green"
                variant="outline"
                onClick={() => handleRegistration(request)}
              >
                Approve
              </Button>
              <Button colorScheme="red" variant="outline">
                Reject
              </Button>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
};

export default ReviewRegistrationReq;
