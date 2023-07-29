import React from "react";
import { Box, Text } from "@chakra-ui/react";

const ManagerSection: React.FC = () => {
  return (
    <Box>
      <Text fontWeight="bold" mb={2}>
        Manager Section
      </Text>
      {/* Add the "Approving or Rejecting Leaves" functionality here */}
      {/* You can also add other role-specific sections for the manager here */}
    </Box>
  );
};

export default ManagerSection;
