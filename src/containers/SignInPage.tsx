import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import SignInForm from "../components/SignInForm";
import { useNavigate } from "react-router-dom";

const SignInContainer: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = (loginDetails: any) => {
    // Call the backend API to perform login with logInDetails.email and logInDetails.password
    // For now, let's assume login is successful and we get the user data from the backend
    const user = {
      name: "John Doe",
      role: "employee", // Replace this with the actual role received from the backend
      // Add other user data here if needed
    };

    // Save the user object to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Perform any additional actions or navigation after successful login
    // For example, redirect the user to the dashboard page
    // You can use React Router for navigation
    navigate('/')
  };

  const handleRegistration = (regDetails: any) => {
    // Call the backend API to perform registration with regDetails object
    // For now, let's assume registration is successful and we get the user data from the backend
    const user = {
      name: `${regDetails.firstName} ${regDetails.lastName}`,
      role: "employee", // Replace this with the actual role received from the backend
      // Add other user data here if needed
    };

    // Save the user object to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Perform any additional actions or navigation after successful registration
    // For example, redirect the user to the dashboard page
    // You can use React Router for navigation
    navigate('/')
  };

  return (
    <Box>
      {/* <Heading as="h1" size="xl" mb={4}>
        Micro Credit Investments
      </Heading> */}
      <SignInForm
        onSubmit={{
          handleLogin: handleLogin,
          handleReg: handleRegistration,
        }}
      />
    </Box>
  );
};

export default SignInContainer;
