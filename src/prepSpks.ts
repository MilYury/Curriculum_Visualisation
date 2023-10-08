/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type ISPK from './interfaces/ISPK';
import type ISPKToSPK from './interfaces/ISPKToSPK';
import type ISPKToSubject from './interfaces/ISPKToSubject';
import type ISubject from './interfaces/ISubject';
import { fetchCsv, csvJSON } from './readCSV';

export const prepSPKs = async (subjects: ISubject[]): Promise<ISPK[]> => {
  const spksCsv = await fetchCsv('spks.csv');
  const spksJson = csvJSON(spksCsv);
  let spks = JSON.parse(spksJson);

  const uniqueIds = {} as any;

  spks = spks.reduce((uniqueSpks: ISPK[], spk: ISPK) => {
    if (uniqueIds[spk.StudyPackageCd] === undefined) {
      uniqueIds[spk.StudyPackageCd] = true;
      uniqueSpks.push(spk);
    }
    return uniqueSpks;
  }, []);

  const spkToSpksCsv = await fetchCsv('spk_spk.csv');
  const spkToSpksJson = csvJSON(spkToSpksCsv);
  const spkToSpks = JSON.parse(spkToSpksJson);

  const spkToSubjectsCsv = await fetchCsv('spk_subject.csv');
  const spkToSubjectsJson = csvJSON(spkToSubjectsCsv);
  const spkToSubjects = JSON.parse(spkToSubjectsJson);

  spks = matchRelations(spks, spkToSpks, spkToSubjects, subjects);

  return spks;
};

const matchRelations = (
  spks: ISPK[],
  spkToSpks: ISPKToSPK[],
  spkToSubjects: ISPKToSubject[],
  subjects: ISubject[]
): ISPK[] => {
  console.log(spks);
  console.log(spkToSpks);
  console.log(spkToSubjects);
  const spkMap: Record<string, ISPK> = {};
  spks.forEach((spk: ISPK) => {
    spkMap[spk.StudyPackageCd] = spk;
  });

  spkToSpks.forEach((relation: ISPKToSPK) => {
    const relatedSpk = spkMap[relation.SPKID2];
    const spk = spkMap[relation.SPKID];
    if (spk !== undefined && relatedSpk !== undefined) {
      if (spk.RelatedSPK === undefined) {
        spk.RelatedSPK = [relatedSpk];
      } else {
        spk.RelatedSPK.push(relatedSpk);
      }
    }
  });

  spkToSubjects.forEach((relation: ISPKToSubject) => {
    const subjectIdWithoutZero = relation.SubjectID?.toString().replace(
      /^0+/,
      ''
    );
    const spk = spkMap[relation.SPKID];
    if (spk !== undefined) {
      const relatedSubject = subjects.find(
        (subject) =>
          subject.StudyPackageCd.toString().replace(/^0+/, '') ===
          subjectIdWithoutZero
      );

      if (relatedSubject !== undefined) {
        if (spk.RelatedSubjects === undefined) {
          spk.RelatedSubjects = [relatedSubject];
        } else {
          spk.RelatedSubjects.push(relatedSubject);
        }
      }
    }
  });

  return spks;
};
