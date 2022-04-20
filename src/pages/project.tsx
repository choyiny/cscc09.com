import * as React from "react";
import Layout from "../components/layout";
import Hero from "../components/hero";
import {Container} from "@chakra-ui/react";
import {graphql} from "gatsby";
import {components} from "../components/mdx";
import {MDXRenderer} from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Seo from "../components/seo";

// markup
const ProjectPage = ({ data }) => {
  return <Layout activePage={"index"}>
    <Seo title={'Project'}/>
    <Hero title='Project'>
      Demonstrate your learning outcomes through creating a web application.
    </Hero>
    <Container maxWidth={{ md: "80%", sm: "100%" }}>
      <MDXProvider components={components}>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
    </Container>
  </Layout>;
};

export default ProjectPage;

export const query = graphql`
  query ProjectSummary {
    mdx(slug: { eq: "project" }) {
      body
      frontmatter {
        title
      }
    }
  }
`;
