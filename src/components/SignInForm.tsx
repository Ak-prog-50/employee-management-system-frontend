import React, { useState } from "react";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  FormControl,
  FormLabel,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

function PasswordInput({
  isConfirm,
  password,
  setLoginDetails,
}: {
  isConfirm: boolean;
  password: string;
  setLoginDetails: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl>
      <FormLabel>{isConfirm ? "Confirm Password" : "Password"}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={isConfirm ? "Confirm Password" : "Password"}
          value={password}
          onChange={(e) =>
            setLoginDetails((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <AiFillEye /> : <AiFillEyeInvisible />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

const SignInForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [logInDetails, setLogInDetails] = useState({
    email: "",
    password: "",
  });
  const [regDetails, setRegDetails] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    address: "",
    dob: "",
    email: "",
    designation: "",
    appointedDate: ""
  });

  return (
    <Flex
      direction={"column"}
      as={"form"}
      alignItems={"center"}
      justifyContent={"center"}
      minH={"100vh"}
    >
      <Heading as="h1" size="lg" mb={4}>Micro Credit Investments</Heading>
      <VStack
        p={8}
        maxW={"md"}
        borderWidth={1}
        borderRadius={8}
        boxShadow={"lg"}
      >
        {!isRegistering ? (
          <>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={logInDetails.email}
                onChange={(e) =>
                  setLogInDetails((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
            </FormControl>
            <PasswordInput
              isConfirm={false}
              password={logInDetails.password}
              setLoginDetails={setLogInDetails}
            />
          </>
        ) : (
          <>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First Name"
                value={regDetails.firstName}
                onChange={(e) =>
                  setRegDetails((prevState) => ({
                    ...prevState,
                    firstName: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Last Name"
                value={regDetails.lastName}
                onChange={(e) =>
                  setRegDetails((prevState) => ({
                    ...prevState,
                    lastName: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <Input
                placeholder="Contact Number"
                value={regDetails.contactNo}
                onChange={(e) =>
                  setRegDetails((prevState) => ({
                    ...prevState,
                    contactNo: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date Of Birth</FormLabel>
              <Input
                placeholder="Date Of Birth"
                value={regDetails.dob}
                onChange={(e) =>
                  setRegDetails((prevState) => ({
                    ...prevState,
                    dob: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={regDetails.email}
                onChange={(e) =>
                  setRegDetails((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Address"
                value={regDetails.address}
                onChange={(e) =>
                  setRegDetails((prevState) => ({
                    ...prevState,
                    address: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Designation</FormLabel>
              <Input
                placeholder="Designation"
                value={regDetails.designation}
                onChange={(e) =>
                  setRegDetails((prevState) => ({
                    ...prevState,
                    designation: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Appointed Date</FormLabel>
              <Input
                placeholder="Appointed Date"
                value={regDetails.appointedDate}
                onChange={(e) =>
                  setRegDetails((prevState) => ({
                    ...prevState,
                    appointedDate: e.target.value,
                  }))
                }
              />
            </FormControl>
          </>
        )}
        <HStack mt={4} spacing={4} width={"100%"} justifyContent={"center"}>
          {!isRegistering ? (
            <Button onClick={() => setIsRegistering(true)} variant={"outline"}>
              Don't have an account? Register
            </Button>
          ) : (
            <Button onClick={() => setIsRegistering(false)} variant={"outline"}>
              Already a User? Sign In
            </Button>
          )}
          <Button>{isRegistering ? "Create Account" : "Sign In"}</Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default SignInForm;
