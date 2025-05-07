---
title: Group Project - Proposal
releaseDate: 2025-05-23
dueDate: 2025-06-06T16:00:00-04:00
---

The project allows you to demonstrate that you have mastered full-stack development concepts learned from this course. As a team of 2-3, you will create a publicly available web application.

## Create the repository

Click here to create or join a team: https://classroom.github.com/a/4CPWkaTc

One team member should create the team, others should join the team.

## Required Elements

> Projects must fulfill the following minimum requirements:

- The application must use a modern frontend framework such as Angular, or Vue 3

  - You are not allowed to create a Barebones React application ([why?](https://react.dev/learn/start-a-new-react-project))
  - Mobile app frameworks such as Expo / NativeScript is not allowed
  - Your frontend must be a Single Page Application (SPA)

- The application must use Express as the core backend API
- The application's API is RESTful where appropriate
- ⚠️ The application must be deployed on a Virtual Machine using Docker and Docker Compose
  - You must commit all your deployment files to Github as well, including CI files for building images.
- The application must be accessible to the general public without extra steps. i.e. A person does not need to talk to your team to access the full application.
- The application must interact with at least one third-party API. Beware of usage limits in the free tier as that may cause your app to not function properly.
- The application must use OAuth 2.0 (an authorization mechanism) for any purpose.

<u>Projects will NOT receive a passing grade (i.e. adjusted to <=49) if the above requirements are not fulfilled.</u>

# Additional Requirements

You must also choose 2 out of 3 Additional Requirements to complete:

- A piece of the application must interact with a webhook by an external service
- A piece of the application is “real-time”, which means it can reflect other user changes without refreshing
- A piece of the application has functionality that executes a long-running task (something that could take more than 10 seconds to complete)

<u>Projects will NOT receive a passing grade (i.e. adjusted to <=49) if the above requirements are not fulfilled.</u>

## ⚠️ Elements that will not be graded or given extra credit ⚠️

- Deployment with Kubernetes
- “Real-time” web chat
- “Real-time” video chat
- Object galleries (such as PDF galleries, video galleries, eBook galleries, etc.)
- Usage of non-web-focused frameworks, like three.js. (Feel free to use it as a supporting element! It looks good)

## Final Presentations

Outstanding web applications will be chosen to present in the last lecture. Selected projects (usually around 30%, maybe more) will obtain a bonus from 1% to 10%. Invited industry experts will make the final decision.

## Complexity

With 9 weeks to complete the project, it must be of fair complexity. (not that of a basic CRUD application, like Web Gallery) It is recommended that progress be made every week towards project completion.

You have unlimited chances to modify your proposal at any point in the course and be reevaluated. You can visit the instructor’s office hours for reevaluation.

## Syllabus

The project comes in 6 parts. All team members must put their best effort into contributing to the project. The instructor reserves the right to assign different grades to each of the team members based on their contributions on GitHub.

| Deliverable                | Weight          |
| -------------------------- | --------------- |
| Proposal                   | 5%              |
| Alpha Version              | 5%              |
| Beta Version               | 10%             |
| Final Version              | 75%             |
| Video Demo                 | 5%              |
| Final Lecture Presentation | up to 10% bonus |

## Proposal (5%) - Github and Gradescope

You must register your team on Github by the deadline. After registration, each team will be assigned a new private Github repository for the project. By the project proposal deadline, the team should have pushed the proposal to their project repository and submit the repository to Gradescope. The proposal will take the form of a README.md file at the root of your project repository on Github. This file should be properly formatted in markdown.

The proposal should contain the following information:

- Project title and team name
- Team members with @mail.utoronto.ca emails
- Brief description of the web application
- Bullet points outlining how to fulfil "Required Elements"
- Bullet points outlining how to fulfil "Additional Requirements"
- Your alpha version, beta version, and final version milestones

Please push to the `main` branch of your team repository and also submit the repository to Gradescope. Only 1 person in your team needs to submit to Gradescope.

You will receive full credit for the proposal if the instructor deems it to be a reasonable project.
You have unlimited chances to modify your proposal at any point in the course and be reevaluated. You can visit the instructor’s office hours for reevaluation.

## Alpha Version (5%) - Github

You must schedule a 15-minute meeting with a TA before the deadline. To receive full credit, you must demonstrate reasonable progress toward your alpha version milestone.

At this point, all your code should be pushed to the `main` branch on Github.

## Beta Version (10%) - Github

You must schedule a 15-minute meeting with an assigned industry expert. During the meeting, you will demonstrate a majority of the features completed.

You will be graded from 1-10 on how good this project is if it was considered in a hiring decision. (1 - will not hire, 10 - definitely hire)

Note that you will be graded in comparison to other teams assigned to the same industry expert.

At this point, all your code should be pushed to `main` branch on Github, and ideally deployed to a public URL already.

## Final Version (75%) - Github and Gradescope

You must push everything to main branch on Github, and also submit the code through Gradescope.

You must add the application's deployed URL to README.md.

Your application must remain available throughout the marking period, which is 2 weeks after the final version deadline.

As mentioned in “Required Elements”, if the application is not deployed or not accessible, you will not receive credit for the final version.

## Video Demo (5%) - Github and Gradescope

Record a 3-minute-long video demonstrating the core features of your web application. You should record the video as if it was part of a hiring process.

Do not show slides, do not show code. Do not spend too long on unimportant features such as login/signup.

Upload your video to Youtube and include it in README.md. The presentation is going to determine who gets to present at the final lecture.

## Final Lecture Presentation (1%-10% bonus)

The top projects of this course will be selected to present in the final lecture to showcase to the entire class. Industry experts will be invited as judges to select the top 3 projects, which will get a bonus attached to their project.

## Academic Integrity

The course policy on academic integrity applies to this project. This means that all code developed for this project must be written exclusively by the members of the team. Any use of UI elements and snippets of code found on the web must be clearly cited in a credit page of the application.

You have the freedom to build whatever you want as a project, however the following restrictions strictly apply:

- You must not use your code that was developed from outside this course.
- You must not use your code that was developed for a paid or unpaid job.
- You must not use your code that was developed for another course, such as CSCC01.
- During the duration of the project, you must not be concurrently paid to do the same project for another entity.

Each team member will be held accountable for the work they submit to the team’s GitHub repository.
