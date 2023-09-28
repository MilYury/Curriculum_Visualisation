import { useEffect, useState } from 'react';
import type ICourse from '../interfaces/ICourse';
import { prepCourses } from '../prepCourses';
import type ISubject from '../interfaces/ISubject';

export const useCourses = (subjects?: ISubject[]): ICourse[] | undefined => {
  const [courses, setCourses] = useState<ICourse[] | undefined>(undefined);

  useEffect(() => {
    const getCourses = async (): Promise<void> => {
      if (subjects !== undefined) {
        setCourses(await prepCourses(subjects));
      }
    };

    void getCourses().catch();
  }, [subjects]);

  return courses;
};
