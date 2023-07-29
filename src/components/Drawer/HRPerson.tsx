import { HStack, IconButton, Text } from "@chakra-ui/react";
import { VscRequestChanges } from "react-icons/vsc";

const HRSection: React.FC = () => {
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
    </>
  );
};

export default HRSection;
