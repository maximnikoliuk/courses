export interface StateCourse {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: number;
  language: string;
  difficultyLevel: string;
}

export interface StateCourses {
  coursesList: Array<StateCourse>;
  totalCount: number;
}

export interface CourseCardProps {
  courseData: StateCourse
}

export interface Comment {
  author: string;
  comment: string;
  courseId: string;
}