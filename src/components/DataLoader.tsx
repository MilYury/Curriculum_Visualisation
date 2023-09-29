import React from 'react';
import { useDispatch } from 'react-redux';
import { useSubjects } from '../hooks/useSubjects';
import { useCourses } from '../hooks/useCourses';
import { useSpks } from '../hooks/useSpks';

const DataLoader: React.FC = () => {
  const subjects = useSubjects();
  const spks = useSpks(subjects);
  const courses = useCourses(subjects, spks);
  const dispatch = useDispatch();
  dispatch({ type: 'SET_DATA_SUBJECTS', payload: subjects });
  dispatch({ type: 'SET_DATA_SPKS', payload: spks });
  dispatch({ type: 'SET_DATA_COURSES', payload: courses });

  return <></>;
};

export default DataLoader;
