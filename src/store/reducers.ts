import { combineReducers } from 'redux';
import subjectReducer, { type SubjectState } from './subjectReducer';
import courseReducer, { type CourseState } from './courseReducer';

export interface RootState {
  subjects: SubjectState;
  courses: CourseState;
}

const rootReducer = combineReducers({
  subjects: subjectReducer,
  courses: courseReducer
});

export default rootReducer;
