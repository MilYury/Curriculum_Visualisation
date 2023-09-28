import React from 'react';
import { type RootState } from '../store/reducers';
import { useSelector } from 'react-redux';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const ExploreCoursesCollapse: React.FC = () => {
  const selectedCourse = useSelector(
    (state: RootState) => state.courses.selectedData
  );

  return (
    <div>
      <h2>{selectedCourse?.FullTitle ?? 'Course Title'}</h2>
      <Collapse accordion>
        {selectedCourse?.Subjects?.map((subject) => (
          <Panel header={subject.FullTitle} key={subject.StudyPackageCd}>
            <h3>Details:</h3>
            <p>Insert info about subject here</p>
            {subject.PreRequisites !== undefined &&
              subject.PreRequisites.length > 0 && (
                <>
                  <h4>Prerequisites:</h4>
                  <ul>
                    {subject.PreRequisites.map((prerequisite) => (
                      <li key={prerequisite.StudyPackageCd}>
                        {prerequisite.FullTitle}
                      </li>
                    ))}
                  </ul>
                </>
              )}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default ExploreCoursesCollapse;
