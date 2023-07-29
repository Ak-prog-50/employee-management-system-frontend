import React, { useEffect } from "react";
import {
  Box,
  HStack,
  Heading,
  IconButton,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import SideDrawer from "../../components/Drawer";
import { useLocation, useNavigate } from "react-router-dom";
import { BsMenuButtonWide } from "react-icons/bs";

const Dashboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

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

  const capitalizeAndRemoveSlash = (path: string) => {
    if (path && path.length > 1) {
      const capitalizedPath = path.charAt(1).toUpperCase() + path.slice(2);
      return capitalizedPath;
    } else {
      return "Micro Credit Investments";
    }
  };

  return (
    <Box>
      <HStack mb={8}>
        <IconButton
          aria-label="menu-button"
          size={"lg"}
          icon={<BsMenuButtonWide />}
          onClick={onOpen}
        />

        <Spacer />
        <Heading as="h1" size="xl" textAlign="center">
          {capitalizeAndRemoveSlash(location.pathname)}
        </Heading>
        <Spacer />

        <SideDrawer userRole="manager" isOpen={isOpen} onClose={onClose} />
      </HStack>
    </Box>
  );
};

export default Dashboard;
