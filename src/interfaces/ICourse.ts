import type ISubject from './ISubject';

interface ICourse {
  StudyPackageCd: string;
  FullTitle: string;
  CreditPointValue: number;
  Subjects: ISubject[];
}

export default ICourse;
