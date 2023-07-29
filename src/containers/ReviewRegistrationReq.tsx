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

const registrationRequests = [
  {
    id: 1,
    name: "John Doe",
    contactNo: "1234567890",
    email: "john.doe@example.com",
    designation: "Software Engineer",
    address: "123 Main Street, Cityville",
    dob: "1993-07-24T00:00:00.000Z",
    appDate: "2023-04-05T00:00:00.000Z",
    role: null,
    registrationStatus: "pending",
    creationDate: "2023-07-25T11:43:32.000Z",
    updatedOn: "2023-07-25T11:43:32.000Z",
    deletionDate: null,
  },
];

const ReviewRegistrationReq = () => {
    return (
      <Stack spacing="4">
        {registrationRequests.map((request: any) => (
          <Card key={request.id} variant="elevated">
            <CardHeader>
              <Heading size="md">{request.name}</Heading>
            </CardHeader>
            <CardBody>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
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
                <Button colorScheme="green" variant="outline">
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
