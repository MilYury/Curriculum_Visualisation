import { combineReducers } from 'redux';
import subjectReducer, { type SubjectState } from './subjectReducer';
import courseReducer, { type CourseState } from './courseReducer';
import spkReducer, { type SPKState } from './spkReducer';

export interface RootState {
  subjects: SubjectState;
  courses: CourseState;
  spks: SPKState;
}

const rootReducer = combineReducers({
  subjects: subjectReducer,
  courses: courseReducer,
  spks: spkReducer
});

export default rootReducer;
