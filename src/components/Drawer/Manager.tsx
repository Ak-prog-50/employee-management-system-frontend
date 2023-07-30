import React from "react";
import { Button } from "@chakra-ui/react";
import { MdOutlineRateReview } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const ManagerSection: React.FC = () => {
  const naviagate = useNavigate();
  return (
    <>
      <Button
        leftIcon={<VscRequestChanges />}
        variant="ghost"
        onClick={() => naviagate("/review-registrations")}
        
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
