import React from "react";
import { Button } from "@chakra-ui/react";
import { AiFillDashboard } from "react-icons/ai";
import {
  BiCalendarCheck,
  BiTimeFive,
  BiCalendarEvent,
  BiFileBlank,
  BiCommentDetail,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CommonSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button leftIcon={<AiFillDashboard />} variant="ghost">
        Dashboard
      </Button>
      <Button
        leftIcon={<BiCalendarCheck />}
        variant="ghost"
        onClick={() => navigate("/leaves")}
      >
        Leaves
      </Button>
      <Button leftIcon={<BiTimeFive />} variant="ghost">
        TimeSheets
      </Button>
      <Button leftIcon={<BiCalendarEvent />} variant="ghost">
        Schedule
      </Button>
      <Button leftIcon={<BiFileBlank />} variant="ghost">
        Reports
      </Button>
      <Button leftIcon={<BiCommentDetail />} variant="ghost">
        Feedback
      </Button>

      {/* Add the "Applying Leaves" functionality here */}
      {/* You can also add other common sections here */}
    </>
  );
};

export default CommonSection;
