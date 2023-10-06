import type React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSubjects } from '../hooks/useSubjects';
import { useCourses } from '../hooks/useCourses';
import { useSpks } from '../hooks/useSpks';

interface DataLoaderProps {
  onDataLoaded: (status: boolean) => void;
}

const DataLoader: React.FC<DataLoaderProps> = ({ onDataLoaded }) => {
  const subjects = useSubjects();
  const spks = useSpks(subjects);
  const courses = useCourses(subjects, spks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (subjects !== undefined && spks !== undefined && courses !== undefined) {
      dispatch({ type: 'SET_DATA_SUBJECTS', payload: subjects });
      dispatch({ type: 'SET_DATA_SPKS', payload: spks });
      dispatch({ type: 'SET_DATA_COURSES', payload: courses });

      onDataLoaded(true);
    }
  }, [subjects, spks, courses, dispatch, onDataLoaded]);

  return null;
};

export default DataLoader;
