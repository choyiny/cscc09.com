import * as React from "react";
import Layout from "../components/layout";
import Hero from "../components/hero";
import { Container, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import UserProfile from "../components/user-profile";

// markup
const TeamPage = ({ data }) => {
  const team = data.teamYaml.team;
  const instructors = team.filter((member) => member.role === "Instructor");
  const industryExperts = team.filter((member) => member.role === "Industry");
  const tas = team.filter((member) => member.role === "TA");
  return (
    <Layout activePage={"team"}>
      <Seo title={"Team"} />
      <Hero title="Team">The team behind the course.</Hero>
      <Container maxWidth={{ md: "90%", sm: "100%" }} mb="3em">
        <Heading>Instructor</Heading>
        <Grid
          templateColumns={[`repeat(1, 1fr)`, null, `repeat(3, 1fr)`]}
          gap={[4, null, 8]}
          my="1em"
        >
          {instructors.map((instructor) => (
            <UserProfile profile={instructor} />
          ))}
        </Grid>
        <Heading>Teaching Assistants</Heading>
        <Grid
          templateColumns={[`repeat(1, 1fr)`, null, `repeat(3, 1fr)`]}
          gap={[4, null, 8]}
          my="1em"
        >
          {tas.map((ta) => (
            <UserProfile profile={ta} />
          ))}
        </Grid>
        <Heading mb="5px">Industry Experts</Heading>
        <Text>
          Leading industry experts in the field of web development will advise
          you on your project when using specific technologies.
        </Text>
        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          my="1em"
        >
          {industryExperts.map((expert) => (
            <UserProfile profile={expert} />
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default TeamPage;

export const query = graphql`
  query TeamQuery {
    teamYaml {
      team {
        name
        role
        title
        expertise
        blurb
        website
        github
      }
    }
  }
`;
