import type ISubject from './ISubject';

interface ISPK {
  StudyPackageCd: string;
  FullTitle: string;
  CreditPointValue: number;
  RelatedSPK: ISPK[];
  RelatedSubjects: ISubject[];
}

export default ISPK;
