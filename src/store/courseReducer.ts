/* eslint-disable indent */
import { type AnyAction } from '@reduxjs/toolkit';
import type ICourse from '../interfaces/ICourse';
import type ISubject from '../interfaces/ISubject';

export interface CourseState {
  data: ICourse[];
  selectedData: ICourse | undefined;
  selectedMultipleData: ISubject[];
  searchValue: string;
}

const initialState: CourseState = {
  data: [],
  selectedData: undefined,
  selectedMultipleData: [],
  searchValue: ''
};

const courseReducer = (
  state: CourseState = initialState,
  action: AnyAction
): CourseState => {
  switch (action.type) {
    case 'SET_DATA_COURSES':
      return {
        ...state,
        data: action.payload
      };
    case 'SET_SELECTED_COURSE':
      return {
        ...state,
        selectedData: state.data.find(
          (course) => course.StudyPackageCd === action.payload
        )
      };
    case 'CLEAR_SELECTED_COURSE':
      return {
        ...state,
        selectedData: undefined
      };
    case 'SET_SEARCH_VALUE_COURSE':
      return {
        ...state,
        searchValue: action.payload
      };
    default:
      return state;
  }
};

export default courseReducer;
