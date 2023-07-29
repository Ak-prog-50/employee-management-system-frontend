import React from "react";
import { Button } from "@chakra-ui/react";
import { MdOutlineRateReview } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";

const ManagerSection: React.FC = () => {
  return (
    <>
      <Button
        leftIcon={<VscRequestChanges />}
        variant="ghost"
        
      >
        Review Registration Requests
      </Button>
      <Button
        leftIcon={<MdOutlineRateReview />}
        variant="ghost"
        
      >
        Review Leaves
      </Button>
    </>
  );
};

export default ManagerSection;
