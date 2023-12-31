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
  VStack,
  Button,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import CommonSection from "./Common";
import ManagerSection from "./Manager";
import HRSection from "./HRPerson";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
// import { AiFillDashboard } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface ISideDrawerProps {
  userRole: "manager" | "hrPerson" | "employee";
  onClose: any;
  isOpen: boolean;
  handleLogout: any;
}

const SideDrawer = ({
  userRole,
  onClose,
  isOpen,
  handleLogout,
}: ISideDrawerProps) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          sx={{
            "& button": {
              width: "full",
              textAlign: "left",
              display: "block",
            },
          }}
        >
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
            {userRole === "employee" && (
              <Button
                leftIcon={<BiTimeFive />}
                variant="ghost"
                onClick={() => navigate("/timesheets")}
              >
                TimeSheets
              </Button>
            )}
            {userRole === "manager" && <ManagerSection />}
            {userRole === "hrPerson" && <HRSection />}
          </DrawerBody>
          <DrawerFooter mr={"auto"}>
            <VStack>
              <>
                {userRole !== "employee" && (
                  <Button
                    leftIcon={<AiOutlineSetting />}
                    variant="ghost"
                    onClick={() => navigate("/edit-profile")}
                  >
                    Edit Profile
                  </Button>
                )}

                <Button
                  leftIcon={<AiOutlineLogout />}
                  variant="ghost"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </Button>
              </>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
