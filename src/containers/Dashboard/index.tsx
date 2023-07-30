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
import { BACKEND_URL } from "../../config";

const Dashboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

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

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
      } else {
        const errorData = JSON.parse(data.message);

        if (errorData.message) {
          alert(errorData.message);
        }
      }
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed");
    }
  };

  const capitalizeAndRemoveSlash = (path: string) => {
    if (path && path.length > 1) {
      const words = path.split("-").map((word, i) => {
        return (
          word.charAt(i === 0 ? 1 : 0).toUpperCase() +
          word.slice(i === 0 ? 2 : 1)
        );
      });
      return words.join(" ");
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

        <SideDrawer
          userRole={parsedUser?.role}
          isOpen={isOpen}
          onClose={onClose}
          handleLogout={handleLogout}
        />
      </HStack>
    </Box>
  );
};

export default Dashboard;
