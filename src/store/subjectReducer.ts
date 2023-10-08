/* eslint-disable indent */
import { type AnyAction } from '@reduxjs/toolkit';
import type ISubject from '../interfaces/ISubject';

export interface SubjectState {
  data: ISubject[];
  selectedData: ISubject | undefined;
  searchValue: string;
}

const initialState: SubjectState = {
  data: [],
  selectedData: undefined,
  searchValue: ''
};

const subjectReducer = (
  state: SubjectState = initialState,
  action: AnyAction
): SubjectState => {
  switch (action.type) {
    case 'SET_DATA_SUBJECTS':
      return {
        ...state,
        data: action.payload
      };
    case 'SET_SELECTED_SUBJECT':
      return {
        ...state,
        selectedData: state.data.find(
          (subject) => subject.StudyPackageCd === action.payload
        )
      };
    case 'CLEAR_SELECTED_SUBJECT':
      return {
        ...state,
        selectedData: undefined
      };
    case 'SET_SEARCH_VALUE_SUBJECT':
      return {
        ...state,
        searchValue: action.payload
      };
    default:
      return state;
  }
};

export default subjectReducer;
