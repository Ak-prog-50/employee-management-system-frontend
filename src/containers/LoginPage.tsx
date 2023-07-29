import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const LoginContainer: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    // Implement your login logic here using API calls or any other method
    console.log("Logging in with email:", email, "and password:", password);
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>
        Micro Credit Investments
      </Heading>
      <LoginForm onSubmit={handleLogin} />
    </Box>
  );
};

export default LoginContainer;
