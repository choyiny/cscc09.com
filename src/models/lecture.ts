type Work = {
  title: string;
  link: string;
  dueDate: string;
};

type Lecture = {
  title: string;
  description: string;
  googleSlides: string;
  labTitle: string;
  assignmentTitle: string;
  projectTitle: string;
  date: string;
  realDate: string;
  isHoliday: boolean;
  lab: Work;
  assignment: Work;
  project: Work;
};
