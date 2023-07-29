import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
  HStack,
  Icon,
  DrawerFooter,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import CommonSection from "./Common";
import ManagerSection from "./Manager";
import HRSection from "./HRPerson";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";

interface ISideDrawerProps {
  userRole: "manager" | "hrPerson" | "employee";
  onClose: any;
  isOpen: boolean;
}

const SideDrawer = ({ userRole, onClose, isOpen }: ISideDrawerProps) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>
            {/* Display user's name or other information here */}
            <HStack spacing={2}>
              <Icon as={AiOutlineUser} boxSize={6} />
              <Text>Employee</Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            {/* Common section visible to all users */}
            <CommonSection />

            {/* Role-specific sections */}
            {userRole === "manager" && <ManagerSection />}
            {userRole === "hrPerson" && <HRSection />}
          </DrawerBody>
          <DrawerFooter mr={"auto"}>
            <VStack alignItems={"left"}>
              <HStack as={"button"}>
                <IconButton
                  aria-label="Time Sheets"
                  icon={<AiOutlineSetting />}
                  variant="ghost"
                />
                <Text> Edit Profile </Text>
              </HStack>
              <HStack as={"button"}>
                <IconButton
                  aria-label="Time Sheets"
                  icon={<AiOutlineLogout />}
                  variant="ghost"
                />
                <Text> Log Out </Text>
              </HStack>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
