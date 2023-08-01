import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { BACKEND_URL } from "../config";
// import { FiUser, FiMail, FiLock, FiPhone, FiCalendar } from "react-icons/fi";

interface UpdateUserFormProps {
  initialData: {
    empId: number;
    name: string;
    contactNo: string;
    email: string;
    age: number;
    designation: string;
    address: string;
    dob: string;
    appDate: string;
    role: "employee" | "manager" | "hrPerson";
  };
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  initialData,
}) => {
  const [userDetails, setUserDetails] = useState({
    empId: initialData.empId,
    name: initialData.name,
    contactNo: initialData.contactNo,
    email: initialData.email,
    age: initialData.age,
    designation: initialData.designation,
    address: initialData.address,
    dob: initialData.dob,
    appDate: initialData.appDate,
    role: initialData.role,
  });

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/edit-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }

      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  return (
    <Box maxW="md" mx="auto" p={4}>
      <FormControl isRequired>
        <FormLabel>Employee ID</FormLabel>
        <Input
          type="number"
          value={userDetails.empId}
          onChange={(e) =>
            setUserDetails({ ...userDetails, empId: Number(e.target.value) })
          }
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
        //   leftIcon={<FiUser />}
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
        //   leftIcon={<FiMail />}
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Contact Number</FormLabel>
        <Input
          type="number"
          value={userDetails.contactNo}
          onChange={(e) =>
            setUserDetails({ ...userDetails, contactNo: e.target.value })
          }
        //   leftIcon={<FiPhone />}
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Age</FormLabel>
        <Input
          type="number"
          value={userDetails.age}
          onChange={(e) =>
            setUserDetails({ ...userDetails, age: Number(e.target.value) })
          }
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Designation</FormLabel>
        <Input
          type="text"
          value={userDetails.designation}
          onChange={(e) =>
            setUserDetails({ ...userDetails, designation: e.target.value })
          }
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          value={userDetails.address}
          onChange={(e) =>
            setUserDetails({ ...userDetails, address: e.target.value })
          }
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          type="date"
          value={userDetails.dob}
          onChange={(e) =>
            setUserDetails({ ...userDetails, dob: e.target.value })
          }
        //   leftIcon={<FiCalendar />}
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Appointment Date</FormLabel>
        <Input
          type="date"
          value={userDetails.appDate}
          onChange={(e) =>
            setUserDetails({ ...userDetails, appDate: e.target.value })
          }
        //   leftIcon={<FiCalendar />}
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Role</FormLabel>
        <Input
          type="text"
          value={userDetails.role}
          onChange={(e) =>
            setUserDetails({ ...userDetails, role: e.target.value as any })
          }
        />
      </FormControl>

      <Flex justify="center" mt={6}>
        <Button colorScheme="teal" onClick={handleUpdateUser}>
          Update User
        </Button>
      </Flex>
    </Box>
  );
};

export default UpdateUserForm;
