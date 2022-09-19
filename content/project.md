---
slug: project
title: Project
---

To succeed in web development, you must be extremely hands on. 40% of your course grade will be determined through this
project that you will work on as a group of 2-3 people. Your application must be deployed on the cloud and available
for the public to view and use. Please note that if you get <50% in the project, you will get no more than a 47 in your
final grade.

# Required Elements
You must demonstrate knowledge obtained in this class. These are the core requirements.

1. Frontend: Use a reactive frontend framework such as [React](https://reactjs.org), [Angular](https://angular.io), [Vue](https://vuejs.org).
2. Backend: Your API must be RESTful where appropriate.
3. Deployment: Be deployed on a Cloud VM such as a DigitalOcean droplet, AWS Lightsail VM, etc. Do not deploy on Kubernetes.

Furthermore, your project must choose 1 of 2 streams to focus on:

**Backend Focused**
1. External Provider: Your application must integrate with at least one external provider.
2. Webhooks: Your application must listen to at least 1 webhook message from an external provider.
3. Real-time: Your application must have a real-time component associated with it.

**Frontend Focused**
1. PWA: Your web application must work offline, and supports browser based notifications with the [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) and Notifications API
2. CSS: The presentation of the website must be mobile-responsive, and 
3. Novel Browser Feature: Your application must make use of interesting browser APIs such as the
[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), [Screen Capture API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture), or WebRTC.

The grading scheme for the above streams are different. Please choose according to your interests.

# Challenge Factor
The course staff acknowledges that some projects will take more time than others. We encourage you to use more
complex technologies and more complex workflows.

Therefore your project will receive a challenge factor that ranges between 0.5 and 1.5 that we will use to adjust
your project final mark. For instance, a challenging project with a challenge factor of 1.2 and a score of 78/100 will
receive a final mark of 93/100.

These are project ideas that will score __poorly__:
- Implement web based chat
- Implement another web gallery (or book gallery, or video gallery...)

These are example project ideas that scored very well in the past:
- A VR web based game built on three.js
- A collaborative development environment, with shell access to the underlying VM. (Github Codespaces clone)
- A browser based speaker that can sync music across multiple devices with lag considerations

These are some examples that were overdone in the past and are not so interesting:
- Collaborative whiteboard
- Collaborative text editor

# Syllabus
The project comes in 4 deliverables:

| Deliverable   | Weight |
|---------------|--------|
| Proposal      | 5%     |
| Alpha Version | 5%     |
| Beta version  | 10%    |
| Final Version | 80%    |


# Deliverables
All team members must put their best effort to contribute to the project. **The instructor reserves the right to assign
different grades to each of the team members based on their individual contributions on Github**.

# Proposal (5%)
You must register your team on [Github](https://classroom.github.com/a/ya3RGBPr) by the deadline. After registration,
each team will be assigned a new private Github repository for the project. By the project proposal
deadline, the team should have pushed the proposal to their project repository and **submit the repository to Gradescope**.
The proposal will take the form of a `README.md` file at the root of your project repository on Github.
This file should be properly formatted in markdown.

To receive full credits, the proposal should contain the following information:

- Project title and team name
- Your focus (frontend focused or backend focused)
- Team members with student numbers
- Description of the web application
- An explanation on how you will fulfil the core requirements and additional requirements of your chosen stream
- What you aim to complete for the alpha version, beta version, and final version.

# Alpha Version (5%)
You must schedule a 15-minute meeting with a TA. To receive full credit, demonstrate to the TA you have sufficient
progress towards a final product. This meeting is also an opportunity to raise any concerns about the team.

At this point, all your code should be pushed to `main` branch on Github.

# Beta Version (10%)
You must schedule a 15-minute meeting with an assigned industry expert. During the meeting, you will demonstrate
a majority of features completed. You will be graded from 1-10 on how good this project is if it was considered in
a hiring decision. (1 - will not hire, 10 - definitely hire)

At this point, all your code should be pushed to `main` branch on Github.

# Final Version (80%)
You must push everything to `main` branch on Github, and also submit the code through Gradescope.

You must add the application's deployed URL to `README.md`.

Your application must remain available throughout the marking period, which is 2 weeks after the final version deadline.
If the application is not deployed, you will not receive credit for the final version.

# Presentation
You are going to take a video demoing your app. This video must 3 min long (+-20 seconds). It should show your web app
(no slides, no code) and the soundtrack should be you explaining what you are doing on screen.

Upload your video to Youtube and include it in `README.md`

Do not spend too long on unimportant features such as login/signup, and show the most impressive features first.

# Recommendations
Here are some key recommendations to consider:
- Work on the most challenging parts first. Have them ready by the beta version.
- Deploy early, deploy often. Deploying is harder than you think and it requires major changes in the code most likely.
- Be careful with third-party APIs. Be aware of their limitations and restrictions.

# Academic Integrity
The course policy on academic integrity applies to this project. This means that all code developed for this project
must be written **exclusively** by the members of the team. Any use of UI elements and snippets of code found on the web
must be **clearly cited** in the credit page of the application.

You have the freedom to build whatever they want as a project, **however the following restrictions strictly apply**:
- You must not use your code that was developed from outside this course.
- You must not use your code that was developed for a paid or unpaid job.
- You must not use your code that was developed for another course, such as CSCC01.

Each team member is responsible and will be held accountable for the work he or she submits to the Github repository.
