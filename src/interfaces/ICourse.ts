import type ISPK from './ISPK';
import type ISubject from './ISubject';

interface ICourse {
  StudyPackageCd: string;
  FullTitle: string;
  CreditPointValue: number;
  SPKs: ISPK[];
  Subjects: ISubject[];
}

export default ICourse;
