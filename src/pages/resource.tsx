import * as React from "react";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Seo from "../components/seo";
import { components } from "../components/mdx";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { Container } from "@chakra-ui/react";
import {graphql} from "gatsby";

const ResourcesPage = ({ data }) => {
  return (
    <Layout activePage={"resources"}>
      <Seo title={"Resources"} />
      <Hero title="Resources">
        Interesting resources that might be useful to you in web development.
        Feel free to make a PR to add to this list!
      </Hero>
      <Container maxWidth={{ md: "80%", sm: "100%" }}>
        <MDXProvider components={components}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXProvider>
      </Container>
    </Layout>
  );
};

export default ResourcesPage;


export const query = graphql`
  query ResourcesQuery {
    mdx(slug: { eq: "resources" }) {
      body
      frontmatter {
        title
      }
    }
  }
`;

