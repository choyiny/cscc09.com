---
title: Group Project - Proposal
releaseDate: 2025-05-22
dueDate: 2025-06-06T16:00:00-04:00
---

The project allows you to demonstrate that you have mastered full-stack development concepts learned from this course. As a team of 2-3, you will create a publicly available web application.

## Create the project team and project repository

Before creating a team, brainstorm with your team about the project you want to build. Your team name should be the same as your project name. It is your responsibility to have frequent meetings with your team to discuss and work on the project together, ideally, in person.

Click here to create or join a Github Classroom Team: https://classroom.github.com/a/HRzKZM4l

On Gradescope, you should also create a team. Only 1 person in your team needs to submit to Gradescope.

For both Github and Gradescope, one team member should create the team, others should join the team.

## Required Elements

> Projects must fulfill the following minimum requirements:

- The application must use a modern frontend framework such as Angular, or Vue 3

  - You are not allowed to create a Barebones React application ([why?](https://react.dev/learn/start-a-new-react-project))
  - Mobile app frameworks such as Expo / NativeScript is not allowed
  - Your frontend must be a Single Page Application (SPA)

- The application must use Express as the core backend API
- The application's core API must be a REST API where appropriate
- The main database must be a PostgreSQL database
  - You are allowed to use other databases for specific features, such as Redis for caching or MongoDB for NoSQL features.
- ⚠️ The application must be deployed on a Virtual Machine using Docker and Docker Compose
  - You must commit all your deployment files to Github as well, including CI files for building images.
- The application must be accessible to the general public without extra steps. i.e. A person does not need to talk to your team to access the full application, such as requesting an email to be added to a development allowlist.
- The application must use OAuth 2.0 (an authorization mechanism) for any purpose.
- The project must be of fair complexity, as determined by the instructor.

<u>Projects will NOT receive a passing grade (i.e. adjusted to <=49) if the above requirements are not fulfilled.</u>

## Security and Payment Requirement

Users must be able to sign up to the application using OAuth 2.0 or your own custom login system. Before they can login, they must also "purchase" a monthly subscription to the application. Otherwise, when a user tries to login, they will be sent to the payment page.

To standardize marking, you must use the [Stripe Checkout](https://docs.stripe.com/billing/quickstart) feature in sandbox mode.

Your team will be marked based on the following criteria:

- Security of login system
- Security of payment system
- Security of user data

Consider the following questions:

- If the user cancels a subscription and tries to login, what happens?
- If the user fails to pay for a subscription, what happens?
- If the user tries to login without a subscription, what happens?

> Note that this feature will be partially automarked with a browser bot.

<u>Projects will NOT receive a passing grade (i.e. adjusted to <=49) if the above requirements are not fulfilled.</u>

## Additional Requirements

You must also choose 1 out of 2 Additional Requirements to complete:

- A piece of the application is “real-time”, which means it can reflect other user changes without refreshing
- A piece of the application uses task queues to process data asynchronously independent of HTTP requests

<u>Projects will NOT receive a passing grade (i.e. adjusted to <=49) if the above requirements are not fulfilled.</u>

## ⚠️ Elements that will not be graded or given extra credit ⚠️

- Deployment with Kubernetes
- “Real-time” web chat
- “Real-time” video chat
- Object galleries (such as PDF galleries, video galleries, eBook galleries, etc.)
- Usage of non-web-focused frameworks, like three.js. (Feel free to use it as a supporting element! It looks good)

## Complexity

With 9 weeks to complete the project, it must be of fair complexity. (not that of a basic CRUD application, like Web Gallery) It is recommended that progress be made every week towards project completion. If the proposal is too simple, the instructor may ask you to increase the complexity of the project. You have unlimited chances to modify your proposal at any point in the course and be reevaluated. You can visit the instructor’s office hours for reevaluation.

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

- Project name
- Team members with @mail.utoronto.ca emails and utorid
- Brief description of the web application
- Modern frontend framework of choice
- Additional Requirement of choice and a brief description of how it will be implemented
- Your alpha version, beta version, and final version milestones

Please push to the `main` branch of your team repository and also submit the repository to Gradescope. Only 1 person in your team needs to submit to Gradescope.

You will receive full credit for the proposal if the instructor deems it to be a reasonable project. You have unlimited chances to modify your proposal at any point in the course and be reevaluated. You can visit the instructor’s office hours for reevaluation.

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

As mentioned in “Required Elements”, if the application is not deployed or not accessible, you will not receive any credit for the final version.

## Video Demo (5%) - Github and Gradescope

Record a 3-minute-long video demonstrating the core features of your web application. You should record the video as if it was part of a hiring process.

Do not show slides, do not show code. Do not show the sign up / login process unless it contains a unique feature that is not already covered in "Security and Payment Requirement".

Upload your video to Youtube and include it in README.md. The presentation is going to determine who gets to present at the final lecture.

Furthermore, please also fill in this Google Form (link will be provided later) to be eligible to be selected for the Presentation bonus.

## Final Lecture Presentation (1%-10% bonus)

Outstanding web applications will be chosen to present in the last lecture. Selected projects (usually around 30%, maybe more) will obtain a bonus from 1% to 10%. Invited industry experts will make the final decision.

## Academic Integrity

The course policy on academic integrity applies to this project. This means that all code developed for this project must be written exclusively by the members of the team. Any use of UI elements and snippets of code found on the web must be clearly cited in a credit page of the application. If you are using Github Copilot for code generation, you must also write the prompt you used the generate the code as an in-line comment.

You have the freedom to build whatever you want as a project, however the following restrictions strictly apply:

- You must not use your code that was developed from outside this course.
- You must not use your code that was developed for a paid or unpaid job.
- You must not use your code that was developed for another course, such as CSCC01.
- During the duration of the project, you must not be concurrently paid to do the same project for another entity.

Each team member will be held accountable for the work they submit to the team’s GitHub repository.
