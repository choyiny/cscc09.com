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
  GridItem,
  Heading,
  Button,
  useColorModeValue,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { LinkCard } from "./link-card";
import { useLocation } from "@reach/router";

/**
 * Return true if the lecture is close enough to the number of days from today.
 */
function isCloseEnough(dateString: string, days: number) {
  // debug mode!
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const debugDate: string = params.get("preview") || null;
  if (debugDate === "all") {
    return true;
  }
  const today = debugDate ? new Date(debugDate) : new Date();
  const d = new Date(dateString);
  return (d - today) / (1000 * 60 * 60 * 24) < days;
}

export default function LectureItem({ lecture, index }) {
  return (
    <Box width={"100%"} p={8} pb={0}>
      <Grid templateColumns="repeat(8, 1fr)" gap={4}>
        <GridItem colSpan={1}>
          <Box display={"flex"} height={"100%"} alignItems={"center"}>
            <Heading size={"3xl"}>{index + 1}</Heading>
          </Box>
        </GridItem>
        <GridItem colSpan={7}>
          <Heading size={"xl"}>{lecture.title}</Heading>
          <Tag> Week of {lecture.date}</Tag>
          <Text>{lecture.description}</Text>
          <Stack spacing={4} direction={["column", "column", "row"]} mt={5}>
            {lecture.googleSlides && (
              <Button
                px={8}
                bg={useColorModeValue("teal.900", "teal.900")}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                as={Link}
                href={lecture.googleSlides}
              >
                Lecture Slides
              </Button>
            )}
            {lecture.lab && isCloseEnough(lecture.lab.dueDate, 14) && (
              <Button
                px={8}
                bg={useColorModeValue("teal.900", "teal.900")}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                as={Link}
                href={lecture.lab.link}
              >
                Lab: {lecture.lab.title}
              </Button>
            )}
            {lecture.assignment &&
              isCloseEnough(lecture.assignment.dueDate, 14) && (
                <Button
                  px={8}
                  bg={useColorModeValue("teal.800", "teal.800")}
                  color={"white"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  as={Link}
                  href={lecture.assignment.link}
                >
                  Assignment: {lecture.assignment.title}
                </Button>
              )}
            {lecture.project && (
                <Button
                  px={8}
                  bg={useColorModeValue("teal.700", "teal.700")}
                  color={"white"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  as={Link}
                  href={lecture.project.link}
                >
                  Project {lecture.project.title}
                </Button>
              )}
          </Stack>
          {lecture.assignment &&
            isCloseEnough(lecture.assignment.dueDate, 14) && (
              <Text>Assignment Due Date: {lecture.assignment.dueDate}</Text>
            )}
          {lecture.project && (
              <Text>Project {lecture.project.title} Due Date: {lecture.project.dueDate}</Text>
            )}
        </GridItem>
      </Grid>
      <Divider pt={8} />
    </Box>
  );
}
