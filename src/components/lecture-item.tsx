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

/**
 * Return true if the lecture is close enough to the number of days from today.
 */
function isCloseEnough(lecture: Lecture, days: number) {
  const today = new Date();
  const d = new Date(lecture.realDate);
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
            {isCloseEnough(lecture, 8) && lecture.lab && (
              <Tag colorScheme="yellow">
                Lab: {lecture.lab.title} {isCloseEnough(lecture) && "hi"}
              </Tag>
            )}
            {isCloseEnough(lecture, 8) && lecture.assignment && (
              <Tag colorScheme="orange">
                Assignment: {lecture.assignment.title}
              </Tag>
            )}
            {isCloseEnough(lecture, 8) && lecture.project && (
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
          {isCloseEnough(lecture, 8) && (
            <LinkCard
              name="Lecture Slides"
              description=""
              link={lecture.googleSlides}
              backgroundColor="blue.500"
            />
          )}
          {isCloseEnough(lecture, 8) && lecture.lab && (
            <LinkCard
              name={"Lab: " + lecture.lab.title}
              description={"Due Date: " + lecture.lab.dueDate + " 11:59pm"}
              link={lecture.lab.link}
              backgroundColor="blue.500"
            />
          )}
          {isCloseEnough(lecture, 8) && lecture.assignment && (
            <LinkCard
              name={"Assignment: " + lecture.assignment.title}
              description=""
              link={lecture.assignment.link}
              backgroundColor="blue.500"
            />
          )}
          {isCloseEnough(lecture, 8) && lecture.project && (
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
