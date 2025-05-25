export interface FileAttributes {
  title: string;
  description: string;
  slug: string;
}

export interface LectureAttributes extends FileAttributes {
  googleSlidesUrl?: string;
  week: number;
  date: Date;
  attributes?: Record<string, any>;
}

export interface CourseworkAttributes extends FileAttributes {
  releaseDate: string;
  description: string;
  dueDate: Date;
  pin: boolean;
}
