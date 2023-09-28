import React from 'react';
import { useDispatch } from 'react-redux';
import { useSubjects } from '../hooks/useSubjects';
import { useCourses } from '../hooks/useCourses';

const DataLoader: React.FC = () => {
  const subjects = useSubjects();
  const courses = useCourses(subjects);
  const dispatch = useDispatch();
  dispatch({ type: 'SET_DATA_SUBJECTS', payload: subjects });
  dispatch({ type: 'SET_DATA_COURSES', payload: courses });

  return <></>;
};

export default DataLoader;
