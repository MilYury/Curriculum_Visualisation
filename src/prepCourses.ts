/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type ICourse from './interfaces/ICourse';
import type ICourseToSubject from './interfaces/ICourseToSubject';
import type ISubject from './interfaces/ISubject';
import { fetchCsv, csvJSON } from './readCSV';

export const prepCourses = async (subjects: ISubject[]): Promise<ICourse[]> => {
  const coursesCsv = await fetchCsv('courses.csv');
  const coursesJson = csvJSON(coursesCsv);
  let courses = JSON.parse(coursesJson);

  const uniqueIds = {} as any;

  courses = courses.reduce((uniqueCourses: ICourse[], course: ICourse) => {
    if (uniqueIds[course.StudyPackageCd] === undefined) {
      uniqueIds[course.StudyPackageCd] = true;
      uniqueCourses.push(course);
    }
    return uniqueCourses;
  }, []);

  const coursesToSubjectsCsv = await fetchCsv('course_subject.csv');
  const coursesToSubjectsJson = csvJSON(coursesToSubjectsCsv);
  const coursesToSubjects = JSON.parse(coursesToSubjectsJson);

  courses = matchPreRequisites(courses, coursesToSubjects, subjects);

  return courses;
};

const matchPreRequisites = (
  courses: ICourse[],
  coursesToSubjects: ICourseToSubject[],
  subjects: ISubject[]
): ICourse[] => {
  console.log(courses);
  console.log(coursesToSubjects);
  const courseMap: Record<string, ICourse> = {};
  courses.forEach((course: ICourse) => {
    courseMap[course.StudyPackageCd] = course;
  });

  coursesToSubjects.forEach((courseToSubject: ICourseToSubject) => {
    const subjectIdWithoutZero = courseToSubject.SubjectID.toString().replace(
      /^0+/,
      ''
    );
    const course = courseMap[courseToSubject.CourseID];
    if (course !== undefined) {
      if (course.Subjects === undefined) {
        course.Subjects = [
          subjects.find(
            (subject) =>
              subject.StudyPackageCd.toString().replace(/^0+/, '') ===
              subjectIdWithoutZero
          )!
        ];
      } else {
        course.Subjects.push(
          subjects.find(
            (subject) =>
              subject.StudyPackageCd.toString().replace(/^0+/, '') ===
              subjectIdWithoutZero
          )!
        );
      }
    }
  });

  return courses;
};
