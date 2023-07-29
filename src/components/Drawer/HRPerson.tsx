import { Button } from "@chakra-ui/react";
import { VscRequestChanges } from "react-icons/vsc";

const HRSection: React.FC = () => {
  return (
    <>
      <Button leftIcon={<VscRequestChanges />} variant="ghost">
        Review Registration Requests
      </Button>
    </>
  );
};

export default HRSection;
