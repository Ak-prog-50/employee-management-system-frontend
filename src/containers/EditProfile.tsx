import React, { useState } from "react";
import {
  Box,
  Input,
  Flex,
  Button,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { BACKEND_URL } from "../config";
import UpdateUserForm from "../components/EditProfile";

const EditProfileContainer = () => {
  const toast = useToast();
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchUserData = () => {
    if (employeeId === null) {
      toast({
        title: "Error",
        description: "Please enter an employee ID.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    setError(null);

    // Fetch user's data from the server based on the entered employee ID
    fetch(`${BACKEND_URL}/user/get-user/${employeeId}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
          setUserData(null);
        } else {
          setUserData(data.data);
        }
      })
      .catch((error) => {
        setError("An error occurred while fetching user's data.");
        console.error("Error while fetching user's data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box maxW="md" mx="auto" p={4}>
      <FormControl isRequired>
        <FormLabel>Enter Employee ID</FormLabel>
        <Flex>
          <Input
            type="number"
            value={employeeId || ""}
            onChange={(e) => setEmployeeId(Number(e.target.value))}
            mr={2}
          />
          <Button colorScheme="teal" onClick={handleFetchUserData}>
            Get User
          </Button>
        </Flex>
      </FormControl>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && userData && (
        <UpdateUserForm initialData={userData} />
      )}
    </Box>
  );
};

export default EditProfileContainer;
