import { useEffect, useState } from 'react';
import { prepSubjects } from '../prepSubjects';
import type ISubject from '../interfaces/ISubject';

export const useSubjects = (): ISubject[] | undefined => {
  const [subjects, setSubjects] = useState<ISubject[] | undefined>(undefined);

  useEffect(() => {
    const getSubjects = async (): Promise<void> => {
      setSubjects(await prepSubjects());
    };

    void getSubjects().catch((error) => {
      console.error('Error fetching subjects:', error);
    });
  }, []);

  return subjects;
};
