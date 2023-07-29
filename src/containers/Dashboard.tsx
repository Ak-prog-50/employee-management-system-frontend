import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import SideDrawer from "../components/Drawer";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  // Replace 'manager' with the actual role received from the backend
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in by checking the presence of the user object in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isLoggedIn = !!user && !!user.role; // Assuming 'role' is a required property for a logged-in user

    if (!isLoggedIn) {
      navigate("/signIn"); // Redirect to the signIn page if not logged in
    }
  }, [navigate]);

  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>
        Employee Management System
      </Heading>
      <SideDrawer userRole="manager" />
    </Box>
  );
};

export default Dashboard;
