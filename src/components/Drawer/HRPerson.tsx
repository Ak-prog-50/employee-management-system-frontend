import { Button } from "@chakra-ui/react";
import { VscRequestChanges } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";

const HRSection: React.FC = () => {
  const naviagte = useNavigate();
  return (
    <>
      <Button
        leftIcon={<VscRequestChanges />}
        variant="ghost"
        onClick={() => naviagte("/review-registrations")}
      >
        Review Registration Requests
      </Button>
      <Button
        leftIcon={<MdOutlineRateReview />}
        variant="ghost"
        onClick={() => naviagte("/create-schedules")}
      >
        Create Schedules
      </Button>
    </>
  );
};

export default HRSection;
