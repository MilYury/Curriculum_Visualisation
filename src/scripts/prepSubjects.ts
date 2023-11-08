/* eslint-disable @typescript-eslint/no-explicit-any */
import type IPreRequisite from '../interfaces/IPreRequisite';
import type ISubject from '../interfaces/ISubject';
import { fetchCsv, csvJSON } from './readCSV';

export const prepSubjects = async (): Promise<ISubject[]> => {
  const subjectsCsv = await fetchCsv('subjects.csv');
  const subjectsJson = csvJSON(subjectsCsv);
  let subjects = JSON.parse(subjectsJson);

  const uniqueIds = {} as any;

  subjects = subjects.reduce(
    (uniqueSubjects: ISubject[], subject: ISubject) => {
      if (uniqueIds[subject.StudyPackageCd] === undefined) {
        uniqueIds[subject.StudyPackageCd] = true;
        uniqueSubjects.push(subject);
      }
      return uniqueSubjects;
    },
    []
  );

  const preReqCsv = await fetchCsv('prereq.csv');
  const preReqJson = csvJSON(preReqCsv);
  const preRequisites = JSON.parse(preReqJson);

  subjects = matchPreRequisites(subjects, preRequisites);

  return subjects;
};

const deepCloneSubject = (subject: ISubject): ISubject => {
  return JSON.parse(JSON.stringify(subject));
};

const matchPreRequisites = (
  subjects: ISubject[],
  preRequisites: IPreRequisite[]
): ISubject[] => {
  console.log(subjects);
  console.log(preRequisites);
  const subjectMap: Record<string, ISubject> = {};
  subjects.forEach((subject: ISubject) => {
    subjectMap[subject.StudyPackageCd] = subject;
  });

  preRequisites.forEach((preRequisite: IPreRequisite) => {
    const subjectIdWithoutZero = preRequisite.ToSubjectID?.toString().replace(
      /^0+/,
      ''
    );
    const subject = subjectMap[subjectIdWithoutZero];
    if (subject !== undefined) {
      const preReqSubject =
        subjectMap[preRequisite.SubjectID.toString().replace(/^0+/, '')];
      if (preReqSubject !== undefined) {
        const clonedPreReqSubject = deepCloneSubject(preReqSubject);
        if (subject.PreRequisites === undefined) {
          subject.PreRequisites = [clonedPreReqSubject];
        } else {
          subject.PreRequisites.push(clonedPreReqSubject);
        }
      }
    }
  });

  return subjects;
};
