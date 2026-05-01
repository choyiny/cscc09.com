---
title: Course Outline
---

# Course Objectives

AI tools like Lovable and Claude have made it possible for anyone to vibecode a working web application in an afternoon. That's a genuine superpower - and we embrace it in this course. But vibecoding gets you a prototype, not a production system. When your app needs to handle thousands of users, stay secure against attackers, or survive a ["Reddit Hug of Death"](https://en.wikipedia.org/wiki/Slashdot_effect), you need to understand what's happening under the hood.

This course teaches the fundamentals of web programming - architectures, protocols, languages, and design patterns - so you can vibecode with confidence. You'll learn to direct AI tools effectively, evaluate and debug the code they generate, and make the architectural decisions that separate a demo from a product that scales.

# Learning Outcomes

Upon successful completion of this course, students will be able to:

1. Direct AI tools to generate frontend and backend code, and critically evaluate the output
2. Build a scalable web application using a reactive frontend framework and a backend API
3. Use browser developer tools to inspect, debug, and optimize a web application
4. Apply design patterns and architectural principles to ensure maintainability and scalability
5. Compare different frameworks and AI-generated approaches from a software architecture point of view, highlighting trade-offs
6. Explain and use multiple protocols and communication patterns between a web server and client

# Prerequisites

Students should be comfortable working in a unix-style environment from CSCB09, and have a basic understanding of relational databases. No assumptions are made about your web development background; all the required concepts will be introduced as needed in the course. However, students must be prepared to learn new technologies and frameworks in a short amount of time independently.

For specific prerequisite requirements see the [UTSC Registrar](https://utsc.calendar.utoronto.ca/course/cscc09h3).

# Course Timing

|         | Time           | Location           | Instructor      |
| ------- | -------------- | ------------------ | --------------- |
| LEC01   | Thursday 5-7pm | Available on ACORN | Cho Yin Yong    |
| PRA0001 | Monday 3-5pm   | Available on ACORN | Pourya Moghadam |
| PRA0002 | Tuesday 3-5pm  | Available on ACORN | Pourya Moghadam |

Practicals are mandatory. Please attend the practical section you are registered in. If you are unable to attend a practical, please contact the instructor.

# Course Staff

We encourage you to post questions regarding course materials and assignments on Slack. If you
need additional support, the course staff will hold regular office hours. Please contact
course staff via Slack direct message; we will not respond to emails.

|                 | Office Hours                            | Location             |
| --------------- | --------------------------------------- | -------------------- |
| Cho Yin Yong    | Thursday 7-8pm or by online appointment | Available on Quercus |
| Pourya Moghadam | Tuesday 5-6pm                           | Available on Quercus |

# Course Information

- [The course website and its GitHub repository](https://github.com/choyiny/cscc09.com)

One of the nice things about using GitHub for the course website is that you can contribute to it. If you see something that should be fixed, or want to improve the UI, feel free to submit a pull request.

- Slack (invitation link on Quercus)

The Slack #summer-2026 channel is the best place to ask technical questions, and general questions about the course, assignments and labs. You are advised to check this as frequently as possible. For personal issues, please private message the instructor. I try to respond by the end of the next day. However, due to volume, it may take longer, especially on weekends.

- [Anonymous Feedback Form](https://forms.gle/q9kfS57RhVbSYCXY6)

If you have feedback about the course, you can send an anonymous feedback to the course instructor (you also have the option of including your name). Since the sender cannot be determined, comments sent through the feedback form are considered public, and they may receive a response at the beginning of class or on Slack.

# Marking Scheme

The numeric marks of labs, assignments, project, and final exam will be used to compute a composite numeric score that will determine your final letter grade for the course:

- Labs: Each lab is closely related to your assignment, and is graded during practicals.
- Assignments: Over the term, you will complete 4 individual assignments.
- Project: As a team, you will develop a novel web application by applying concepts learned in this course.
- Final Exam: The final exam is comprehensive, 3 hours, and held during the exam period.

The weighting of course work is set as:

| Component        | Weight |
| ---------------- | ------ |
| AI Readiness Lab | 1%     |
| Labs             | 4%     |
| Assignments      | 30%    |
| Project          | 35%    |
| Final Exam       | 30%    |

<u>Marks of at least 50% on the project AND at least 50% on the final exam are required to pass the course. If you
receive less than 50% on either the project or the final exam, your overall course grade will be capped at 47.</u>

# Submission and Grading Policy

For each piece of work done for this class (either a lab, an assignment or the project), the student or the team will be required to submit the source code on the GitHub repository (student repository for individual work, team repository for the project).

For group work, the instructor reserves the right to assign different grades to each of the team members based on their individual contributions made to the team repository.

For your work to be graded, it must meet the minimum standards of a professional computer scientist. All files required to build the program must be committed to the repository, and the program must work. Last-minute difficulties with git can easily be avoided by ensuring all files are added to the repository well before the deadline, and that you know how to commit them. Your submission may receive a grade of 0, if we cannot get any part of it to work.

No late submissions will be accepted for any course work, and no make-up assignments will be provided for missed/poorly completed work. It is your responsibility to ensure that all work is completed on time and to the best of your ability.

If an emergency arises that prevents you from being able to complete any piece of work, contact one of the instructors immediately and complete necessary documentation by the [Registrar's Office](https://www.utsc.utoronto.ca/registrar/absence-declaration-acorn). The absence declaration cannot be used as supporting documentation to defer final exams and you may only use it once per term. For subsequent absences, you must also follow the instructions on the [Registrar's Office](https://www.utsc.utoronto.ca/registrar/absence-declaration-acorn) website and contact the instructor immediately.

If you believe that a piece of work has been graded incorrectly, you may request a remark. For a remark to be successful, you must clearly and concisely express what you believe was graded incorrectly. To request a remark, please contact your TA. Requests must be submitted within 1 week of the marks being returned.

# AI Usage Policy

Students are permitted to use the [GitHub Copilot for Students](https://github.com/education/students) plan to generate code for all coursework in this course. To do so, you must first pass the AI Readiness Lab and acknowledge you are following AI attribution best practices. Obtaining access to GitHub Copilot for Students is free.

**You must not use any AI without first passing the AI readiness lab. The lab will contain detailed instructions on approved uses of AI.**

Use of GitHub Copilot for Students is subject to the following requirements:

1. **Session logging.** If you start an AI session, at the end of the session, you must export the entire conversation between you and the AI, and put it in your repository under `/_prompts/(timestamp)_xxx.(txt|json)`.
2. **AI Co-author.** All GitHub commits assisted with AI must have its Copilot attribution present.
3. **Original instruction.** You must formulate prompts in your own words. Copying the assignment handout, lecture notes, or lecture examples verbatim into an AI tool is not permitted. You are expected to personally direct the AI tool based on your own understanding of the problem.
4. **Understanding.** You are responsible for all code you submit, whether written by you or generated by an AI tool. If challenged, you must be able to explain and reproduce your work. To clarify, if you are not able to correctly explain the AI-generated code, the instructor reserves the right to set the mark to 0 and report your work to the Academic Integrity Office.

The following non exhaustive examples are considered **unacceptable uses of AI** and will be treated as academic misconduct:

- Using the assignment handout without rephrasing as an input prompt to Github Copilot for Students.
- Submitting prompts that are highly similar to those of another student. Shared or copied prompts constitute plagiarism.
- Using unapproved models or AI tools not covered by GitHub Copilot for Students. For clarity, students are not allowed to use any online AI chat bots such as chatgpt.com, claude.ai, gemini.google, etc.
- Incorrectly explaining a code snippet when challenged by a member of the teaching team.

# Academic Integrity

You are expected to comply with the [Code of Behaviour on Academic Matters](https://governingcouncil.utoronto.ca/secretariat/policies/code-behaviour-academic-matters-july-1-2019).

Any violation of the AI Usage Policy above will be treated as academic misconduct.

Assignment solutions must be prepared individually, except for the project, where you may collaborate with partners. For group work, you are fully responsible for the piece of work you submit to the team repository as your contribution to the group work.

When the assignment handout allows you to use snippets of code or third-party library from the web, you should cite the source in the source code. As a rule of thumb, any piece of code larger than 5 lines that has been copied and reused as-is or even slightly modified must be clearly attributed via inline comments.

You may discuss assignments with other students, for example to clarify the requirements of an assignment, to work through examples that help you understand the technology used for an assignment, or to learn how to configure your system to run a supporting piece of software used in an assignment. However, collaboration at the level of answering written questions or designing and writing code, is strictly forbidden. Written problems and programming assignments must be answered, designed and coded by you alone, using the text, your own notes, and other texts and Web sources as aids. The course staff reserves the right to use code and text analysis tools to compare your submission with others to verify that no improper collaboration has occurred.

Do not let other students look at your assignment solutions, since this can lead to copying. Remember you are in violation of the UTSC Academic Code whether you copy someone else’s work or allow someone else to copy your work.

These rules are meant to ensure that all students understand their solutions well enough to prepare the solutions themselves. If challenged you must be able to reproduce and explain your work.

You are not allowed to ask for help outside the course. Asking for help anywhere else online or in private chat groups (unless the private group chat was set up between the group members of the same group project) will be considered as unauthorized help.

Failure to comply with these guidelines is a serious academic offence. In past academic offense cases, the Associate Dean has imposed penalties for code violations that range from a mark of zero on plagiarized assignments to academic suspension from the University.

# Accessibility Needs

The University of Toronto is committed to accessibility. If you require accommodations for a disability, or have any accessibility concerns about the course, the classroom or course materials, please contact [AccessAbility Services](https://www.utsc.utoronto.ca/ability/welcome-accessability-services)
as soon as possible.

# Credits

Many thanks to Professor [Thierry Sans](https://thierrysans.me) for providing me with course material to run this course.
