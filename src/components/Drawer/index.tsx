import React from "react";
import {
  Box,
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import CommonSection from "./Common";
import ManagerSection from "./Manager";
import HRSection from "./HRPerson";

interface ISideDrawerProps {
  userRole: "manager" | "hrPerson" | "employee";
}

const SideDrawer = ({ userRole }: ISideDrawerProps) => {
  return (
    <Drawer placement="left" isOpen={true} onClose={() => {}}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          {/* Display user's name or other information here */}
          {/* Example: <Text>{userName}</Text> */}
        </DrawerHeader>
        <DrawerBody>
          {/* Common section visible to all users */}
          <CommonSection />

          {/* Role-specific sections */}
          {userRole === "manager" && <ManagerSection />}
          {userRole === "hrPerson" && <HRSection />}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
