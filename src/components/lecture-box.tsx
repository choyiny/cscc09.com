import React from "react";
import {Heading, HStack, LinkBox, LinkOverlay, Tag, Text, useColorModeValue} from "@chakra-ui/react";

export default function LectureBox({ index, lecture }) {
  return (
    <LinkBox
      p={6}
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      fontSize={[`lg`, null, `md`, `1.125rem`, `1.3125rem`]}
      backgroundColor={useColorModeValue('gray.100', 'gray.700')}
      _hover={{
        backgroundColor: useColorModeValue('gray.200', 'gray.600')
      }}
    >
      <LinkOverlay href='/lectures' mb="1em">
        <Heading fontWeight="bold" fontSize="xl">
          {index + 1}. {lecture.title}
        </Heading>
      </LinkOverlay>
      <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>{lecture.description}</Text>
      <HStack spacing={1} mt='1em'>
        {lecture.labTitle && <Tag colorScheme='yellow'>Lab: {lecture.labTitle}</Tag>}
        {lecture.assignmentTitle && <Tag colorScheme='orange'>Assignment: {lecture.assignmentTitle}</Tag>}
        {lecture.projectTitle && <Tag colorScheme='red'>Project: {lecture.projectTitle}</Tag>}
      </HStack>
    </LinkBox>
  )
}
