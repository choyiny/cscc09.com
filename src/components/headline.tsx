import React from "react";
import {Box, Heading, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import UtscLogo from "../images/utsc-logo.svg";
import UtscLogoWhite from "../images/utsc-logo-white.svg";

export default function Headline() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Image src={useColorModeValue(UtscLogo, UtscLogoWhite)} w='300px' mx='auto'/>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        <Text as={"span"} color={"blue.400"} fontWeight={"bold"}>
          CSCC09
        </Text>{" "}
        Programming on the Web
      </Heading>
      <Text color={"gray.500"} mb="1em">
        An introduction to software development on the web. Concepts underlying
        the development of programs that operate on the web. Operational
        concepts of the internet and the web, static and dynamic client content,
        dynamically served content, n-tiered architectures, web development
        processes and security on the web.
      </Text>
      <Text>
        Instructor: <Link href="https://choy.in">Cho Yin Yong</Link>
      </Text>
    </Box>
  );
}
