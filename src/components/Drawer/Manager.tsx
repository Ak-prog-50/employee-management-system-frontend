import React from "react";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import { MdOutlineRateReview } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";

const ManagerSection: React.FC = () => {
  return (
    <>
      <HStack as={"button"}>
        <IconButton
          aria-label="Time Sheets"
          icon={<VscRequestChanges />}
          variant="ghost"
        />
        <Text> Review Registration Requests </Text>
      </HStack>
      <HStack as={"button"}>
        <IconButton
          aria-label="Time Sheets"
          icon={<MdOutlineRateReview />}
          variant="ghost"
        />
        <Text> Review Leaves </Text>
      </HStack>
    </>
  );
};

export default ManagerSection;
