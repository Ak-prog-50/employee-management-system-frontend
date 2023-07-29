import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

const RegisterContainer: React.FC = () => {
  const handleRegister = (name: string, email: string, password: string) => {
    // Implement your registration logic here using API calls or any other method
    console.log(
      "Registering user with name:",
      name,
      "email:",
      email,
      "and password:",
      password
    );
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>
        Micro Credit Investments
      </Heading>
      <RegisterForm onSubmit={handleRegister} />
    </Box>
  );
};

export default RegisterContainer;
