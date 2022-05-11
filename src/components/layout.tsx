import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "./navigation";
import Footer from "./footer";
import Seo from "./seo";
import theme from "../constants/theme";

export default function Layout({ children, activePage }) {
  return (
    <ChakraProvider theme={theme}>
      <Seo />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </ChakraProvider>
  );
}
