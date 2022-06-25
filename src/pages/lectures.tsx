import * as React from "react";
import Layout from "../components/layout";
import Hero from "../components/hero";
import { Accordion, Container } from "@chakra-ui/react";
import LectureItem from "../components/lecture-item";
import { graphql } from "gatsby";
import Seo from "../components/seo";

// markup
const LecturesPage = ({ data }) => {
  const lectures = data.lecturesYaml.lectures;
  return (
    <Layout activePage={"lecture"}>
      <Seo title={"Course Schedule"} />
      <Hero title="Course Schedule">Lecture Slides and course work.</Hero>
      <Container maxWidth={{ md: "90%", sm: "100%" }} mb="3em">
        <Accordion allowToggle>
          {lectures.map((lecture: Lecture, index: number) => {
            return <LectureItem lecture={lecture} index={index} key={'lecture-' + index} />;
          })}
        </Accordion>
      </Container>
    </Layout>
  );
};

export default LecturesPage;

export const query = graphql`
  query Lectures {
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
