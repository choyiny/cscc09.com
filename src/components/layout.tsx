import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "./navigation";
import Footer from "./footer";

export default function Layout({ children, activePage }) {
  return (
    <ChakraProvider>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </ChakraProvider>
  );
}
