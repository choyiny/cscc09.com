import * as React from "react";
import Layout from "../components/layout";
import Headline from "../components/headline";
import Hero from "../components/hero";
import {Container, Grid, LinkBox, LinkOverlay, Text} from "@chakra-ui/react";
import LectureBox from "../components/lecture-box";
import {graphql} from "gatsby";

type Lecture = {
  title: string;
  description: string;
  googleSlides: string;
  labTitle: string;
  assignmentTitle: string;
  projectTitle: string;
}

// markup
const LecturesPage = ({ data }) => {
  const lectures = data.lecturesYaml.lectures
  return <Layout activePage={"index"}>
    <Hero title='Lectures'>
      Lectures and related coursework.
    </Hero>
    <Container maxWidth={{ md: "90%", sm: "100%" }} mb='3em'>
      <Grid
        templateColumns={[`repeat(1, 1fr)`, null, `repeat(3, 1fr)`]}
        gap={[4, null, 8]}
      >
        {
          lectures.map((lecture: Lecture, index: number) => {
            return <LectureBox
              index={index}
              lecture={lecture}
            />
          })
        }
      </Grid>
    </Container>
  </Layout>;
};

export default LecturesPage;

export const query = graphql`
   query Lectures {
    lecturesYaml {
      lectures {
        description
        googleSlides
        title
        labTitle
        assignmentTitle
        projectTitle
      }
    }
  }
`