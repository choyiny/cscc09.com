import * as React from "react";
import { headings } from "./headings";
import {
  Link,
  OrderedList,
  Table,
  Code,
  Text,
  UnorderedList, Tr, Td, Th, TableContainer,
} from "@chakra-ui/react";

export const components = {
  p: (props: object) => (
    <Text
      {...props}
      fontSize="md"
      lineHeight="1.6"
      textAlign="justify"
      mb="1em"
    />
  ),
  a: (props: object) => <Link {...props} textDecoration="underline" />,
  ol: (props: object) => <OrderedList {...props} mb='1em' />,
  ul: (props: object) => <UnorderedList {...props} mb='1em'/>,
  code: (props: object) => <Code colorScheme='gray' {...props}/>,
  table: (props: object) => (
    <TableContainer>
      <Table variant="simple" {...props}/>
    </TableContainer>
  ),
  tr: (props: object) => <Tr {...props}/>,
  td: (props: object) => <Td {...props}/>,
  th: (props: object) => <Th {...props}/>,
  ...headings,
};
