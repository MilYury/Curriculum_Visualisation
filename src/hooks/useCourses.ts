import { useEffect, useState } from 'react';
import type ICourse from '../interfaces/ICourse';
import { prepCourses } from '../scripts/prepCourses';
import type ISubject from '../interfaces/ISubject';
import type ISPK from '../interfaces/ISPK';

export const useCourses = (
  subjects?: ISubject[],
  spks?: ISPK[]
): ICourse[] | undefined => {
  const [courses, setCourses] = useState<ICourse[] | undefined>(undefined);

  useEffect(() => {
    const getCourses = async (): Promise<void> => {
      if (subjects !== undefined && spks !== undefined) {
        setCourses(await prepCourses(subjects, spks));
      }
    };

    void getCourses().catch((error) => {
      console.error('Error fetching courses:', error);
    });
  }, [subjects, spks]);

  return courses;
};
