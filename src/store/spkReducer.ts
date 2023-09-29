/* eslint-disable indent */
import { type AnyAction } from '@reduxjs/toolkit';
import type ISPK from '../interfaces/ISPK';

export interface SPKState {
  data: ISPK[];
}

const initialState: SPKState = {
  data: []
};

const spkReducer = (
  state: SPKState = initialState,
  action: AnyAction
): SPKState => {
  switch (action.type) {
    case 'SET_DATA_SPKS':
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default spkReducer;
