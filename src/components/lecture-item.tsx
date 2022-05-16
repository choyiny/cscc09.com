import React from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Tag,
  Text,
  Link,
  VStack,
  Grid,
} from "@chakra-ui/react";
import { LinkCard } from "./link-card";
import { useLocation } from '@reach/router';

/**
 * Return true if the lecture is close enough to the number of days from today.
 */
function isCloseEnough(dateString: string, days: number) {
  // debug mode!
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  if (params.get('viewAll') === 'definitely') {
   return true;
  }
  const today = new Date();
  const d = new Date(dateString);
  return (d - today) / (1000 * 60 * 60 * 24) < days;
}

export default function LectureItem({ lecture }) {
  return (
    <AccordionItem isDisabled={lecture.isHoliday}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {lecture.date} - {lecture.title}
          </Box>
          <HStack spacing={1}>
            {lecture.lab && isCloseEnough(lecture.lab.dueDate, 7) && (
              <Tag colorScheme="yellow">
                Lab: {lecture.lab.title}
              </Tag>
            )}
            {isCloseEnough(lecture.realDate, 0) && lecture.assignment && (
              <Tag colorScheme="orange">
                Assignment: {lecture.assignment.title}
              </Tag>
            )}
            {isCloseEnough(lecture.realDate, 0) && lecture.project && (
              <Tag colorScheme="red">Project: {lecture.project.title}</Tag>
            )}
          </HStack>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>{lecture.description}</Text>
        <Grid
          templateColumns={[`repeat(1, 1fr)`, null, `repeat(3, 1fr)`]}
          gap={[4, null, 8]}
          my="1em"
        >
          {isCloseEnough(lecture.realDate, 0) && (
            <LinkCard
              name="Lecture Slides"
              description=""
              link={lecture.googleSlides}
              backgroundColor="blue.500"
            />
          )}
          {isCloseEnough(lecture.realDate, 1) && lecture.lab && (
            <LinkCard
              name={"Lab: " + lecture.lab.title}
              description={"Due Date: " + lecture.lab.dueDate + " 11:59pm"}
              link={lecture.lab.link}
              backgroundColor="blue.500"
            />
          )}
          {isCloseEnough(lecture.realDate, 1) && lecture.assignment && (
            <LinkCard
              name={"Assignment: " + lecture.assignment.title}
              description=""
              link={lecture.assignment.link}
              backgroundColor="blue.500"
            />
          )}
          {isCloseEnough(lecture.realDate, 1) && lecture.project && (
            <LinkCard
              name={"Project: " + lecture.project.title}
              description=""
              link={lecture.project.link}
              backgroundColor="blue.500"
            />
          )}
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}
