import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function UserProfile({ profile, ...rest }) {
  return (
    <Box borderColor="gray.500" borderRadius="1em" m="0.5em" py="1em">
      <VStack {...rest}>
        <Heading as="h3" size="md">
          {profile.name}
        </Heading>
        <Text>{profile.title}</Text>
      </VStack>
    </Box>
  );
}
