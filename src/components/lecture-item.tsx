import React from "react";
import {
  AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
  Box,
  HStack,
  Tag,
  Text,
  Link, VStack,
} from "@chakra-ui/react";

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
          <Box flex='1' textAlign='left'>
            {lecture.date} - {lecture.title}
          </Box>
          <HStack spacing={1}>
            {isCloseEnough(lecture, 21) && lecture.lab && <Tag colorScheme='yellow'>Lab: {lecture.lab.title} {isCloseEnough(lecture) && 'hi'}</Tag>}
            {isCloseEnough(lecture, 21) && lecture.assignment && <Tag colorScheme='orange'>Assignment: {lecture.assignment.title}</Tag>}
            {isCloseEnough(lecture, 21) && lecture.project && <Tag colorScheme='red'>Project: {lecture.project.title}</Tag>}
          </HStack>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>{lecture.description}</Text>
        <VStack>
          {isCloseEnough(lecture, 21) && lecture.googleSlides &&
            <Link textDecoration='underline' href={lecture.googleSlides}>Google Slides</Link>
          }
          {isCloseEnough(lecture, 21) && lecture?.lab &&
            <Link textDecoration='underline' href={lecture.lab.link}>Lab: {lecture.lab.title} (Due Date: {lecture.lab.dueDate})</Link>
          }
          {isCloseEnough(lecture, 21) && lecture?.assignment &&
            <Link textDecoration='underline' href={lecture.assignment.link}>Link to Assignment</Link>
          }
          {isCloseEnough(lecture, 21) && lecture?.project &&
            <Link textDecoration='underline' href={lecture.project.link}>Link to Project</Link>
          }
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  )
}
