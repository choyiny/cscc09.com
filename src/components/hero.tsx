import React from "react";
import { Box, Heading, Link, Text } from "@chakra-ui/react";

export default function Hero({ title, children }) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {title}
      </Heading>
      <Text color={"gray.500"} mb="1em">
        {children}
      </Text>
    </Box>
  );
}
