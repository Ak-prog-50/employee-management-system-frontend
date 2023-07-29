import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import SignInForm from "../components/SignInForm";

const SignInContainer: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    // Implement your login logic here using API calls or any other method
    console.log("Logging in with email:", email, "and password:", password);
  };

  return (
    <Box>
      {/* <Heading as="h1" size="xl" mb={4}>
        Micro Credit Investments
      </Heading> */}
      <SignInForm onSubmit={handleLogin} />
    </Box>
  );
};

export default SignInContainer;
