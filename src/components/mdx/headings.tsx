import { Heading } from "@chakra-ui/react";
import * as React from "react";

export const headings = {
  h1: (props: object) => (
    <Heading as="h1" size="md" mt="1em" mb="0.5em" {...props} />
  ),
  h2: (props: object) => <Heading as="h2" size="sm" mb="0.5em" {...props} />,
};
