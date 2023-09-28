interface ISubject {
  StudyPackageCd: string;
  FullTitle: string;
  CreditPointValue: number;
  PreRequisites: ISubject[];
}

export default ISubject;
