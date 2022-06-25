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
  const debugDate: string = params.get('preview') || null;
  const today = debugDate ? new Date(debugDate): new Date();
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
            {lecture.lab && (isCloseEnough(lecture.lab.dueDate, 14) || lecture.lab.bonus) && (
              <Tag colorScheme="yellow">
                Lab: {lecture.lab.title}
              </Tag>
            )}
            {lecture.assignment && isCloseEnough(lecture.assignment.dueDate, 14) && (
              <Tag colorScheme="orange">
                Assignment: {lecture.assignment.title}
              </Tag>
            )}
            {lecture.project && (
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
          {isCloseEnough(lecture.realDate, 1) && lecture.googleSlides && (
            <LinkCard
              name="Lecture Slides"
              description=""
              link={lecture.googleSlides}
              backgroundColor="blue.500"
            />
          )}
          {lecture.lab && (isCloseEnough(lecture.lab.dueDate, 14) || lecture.lab.bonus) && lecture.lab.link && (
            <LinkCard
              name={"Lab: " + lecture.lab.title}
              description={"Show your completed lab to the TA during your practical for a grade"}
              link={lecture.lab.link}
              backgroundColor="blue.500"
            />
          )}
          {lecture.assignment && isCloseEnough(lecture.assignment.dueDate, 14) && lecture.assignment.link && (
            <LinkCard
              name={"Assignment: " + lecture.assignment.title}
              description={"Due Date: " + lecture.assignment.dueDate + " 11:59pm"}
              link={lecture.assignment.link}
              backgroundColor="blue.500"
            />
          )}
          {lecture.project && (
            <LinkCard
              name={"Project: " + lecture.project.title}
              description={"Due Date: " + lecture.project.dueDate + " 11:59pm"}
              link={lecture.project.link}
              backgroundColor="blue.500"
            />
          )}
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}
