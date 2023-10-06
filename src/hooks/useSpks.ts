import { useEffect, useState } from 'react';
import type ISPK from '../interfaces/ISPK';
import { prepSPKs } from '../prepSpks';
import type ISubject from '../interfaces/ISubject';

export const useSpks = (subjects?: ISubject[]): ISPK[] | undefined => {
  const [spks, setSpks] = useState<ISPK[] | undefined>(undefined);

  useEffect(() => {
    const getSpks = async (): Promise<void> => {
      if (subjects !== undefined) {
        setSpks(await prepSPKs(subjects));
      }
    };

    void getSpks().catch((error) => {
      console.error('Error fetching spks:', error);
    });
  }, [subjects]);

  return spks;
};
