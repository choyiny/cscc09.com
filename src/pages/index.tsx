import * as React from "react";
import Layout from "../components/layout";
import Headline from "../components/headline";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import { Container } from "@chakra-ui/react";
import { components } from "../components/mdx";

// markup
const IndexPage = ({ data }) => {
  return (
    <Layout activePage={"index"}>
      <Container maxWidth={{ md: "80%", sm: "100%" }}>
        <Headline />
        <MDXProvider components={components}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXProvider>
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query CourseOutline {
    mdx(slug: { eq: "outline" }) {
      body
      frontmatter {
        title
      }
    }
  }
`;
