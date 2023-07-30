import { Button } from "@chakra-ui/react";
import { VscRequestChanges } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

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
    </>
  );
};

export default HRSection;
