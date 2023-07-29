import React from "react";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import { BsMenuButtonWide } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";
import {
  BiBarChartAlt2,
  BiCalendarCheck,
  BiTimeFive,
  BiCalendarEvent,
  BiFileBlank,
  BiCommentDetail,
} from "react-icons/bi";

const CommonSection: React.FC = () => {
  return (
    <>
      <HStack as={'button'}>
        <IconButton
          aria-label="Time Sheets"
          icon={<AiFillDashboard />}
          variant="ghost"
        />
        <Text> Dashboard </Text>
      </HStack>
      <HStack as={'button'}>
        <IconButton
          aria-label="Time Sheets"
          icon={<BiCalendarCheck />}
          variant="ghost"
        />
        <Text> Leaves </Text>
      </HStack>
      <HStack as={'button'}>
        <IconButton
          aria-label="Time Sheets"
          icon={<BiTimeFive />}
          variant="ghost"
        />
        <Text> TimeSheets </Text>
      </HStack>
      <HStack as={'button'}>
        <IconButton
          aria-label="Time Sheets"
          icon={<BiCalendarEvent />}
          variant="ghost"
        />
        <Text> Schedule </Text>
      </HStack>
      <HStack as={'button'}>
        <IconButton
          aria-label="Time Sheets"
          icon={<BiFileBlank />}
          variant="ghost"
        />
        <Text> Reports </Text>
      </HStack>
      <HStack as={'button'}>
        <IconButton
          aria-label="Time Sheets"
          icon={<BiCommentDetail />}
          variant="ghost"
        />
        <Text> Feedback </Text>
      </HStack>

      {/* Add the "Applying Leaves" functionality here */}
      {/* You can also add other common sections here */}
    </>
  );
};

export default CommonSection;
