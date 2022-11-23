import * as React from "react";
import Layout from "../components/layout";
import Hero from "../components/hero";
import {
  Box,
  Tag,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  Button,
  Link,
} from "@chakra-ui/react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import LectureItem from "../components/lecture-item";

// markup
const SchedulePage = ({ data }) => {
  const lectures = data.lecturesYaml.lectures;
  return (
    <Layout activePage={"schedule"}>
      <Seo title={"Schedule"} />
      <Hero title="Schedule">
        An outline of what we're going to cover in 12 weeks, as well as assignment and project deadlines.
      </Hero>
      <Container maxWidth={{ md: "90%", sm: "100%" }} mb="3em">
        {lectures.map((lecture: Lecture, index: number) => {
          return <LectureItem lecture={lecture} index={index} />;
        })}
      </Container>
    </Layout>
  );
};

export default SchedulePage;

export const query = graphql`
  query Schedule {
    lecturesYaml {
      lectures {
        description
        googleSlides
        title
        lab {
          title
          link
          dueDate(formatString: "MMMM DD, YYYY")
          bonus
        }
        assignment {
          title
          link
          dueDate(formatString: "MMMM DD, YYYY")
        }
        project {
          title
          link
          dueDate(formatString: "MMMM DD, YYYY")
        }
        date(formatString: "MMMM DD")
        realDate: date
        isHoliday
      }
    }
  }
`;
