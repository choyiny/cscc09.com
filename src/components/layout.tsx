import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "./navigation";
import Footer from "./footer";
import Seo from "./seo";

export default function Layout({ children, activePage }) {
  return (
    <ChakraProvider>
      <Seo />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </ChakraProvider>
  );
}
