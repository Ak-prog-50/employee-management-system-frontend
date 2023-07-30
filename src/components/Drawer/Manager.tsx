import React from "react";
import { Button } from "@chakra-ui/react";
import {
  MdOutlineRateReview,
  MdDateRange,
  MdInsertChart,
  MdTimeline,
} from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const ManagerSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        leftIcon={<VscRequestChanges />}
        variant="ghost"
        onClick={() => navigate("/review-registrations")}
      >
        Review Registration Requests
      </Button>
      <Button
        leftIcon={<MdOutlineRateReview />}
        variant="ghost"
        onClick={() => navigate("/review-leaves")}
      >
        Review Leaves
      </Button>
      <Button
        leftIcon={<MdTimeline />}
        variant="ghost"
        onClick={() => navigate("/review-timesheets")}
      >
        Review TimeSheets
      </Button>
      <Button
        leftIcon={<MdDateRange />}
        variant="ghost"
        onClick={() => navigate("/review-schedules")}
      >
        Review Schedules
      </Button>
      <Button
        leftIcon={<MdInsertChart />}
        variant="ghost"
        onClick={() => navigate("/create-report")}
      >
        Create Report
      </Button>
    </>
  );
};

export default ManagerSection;
