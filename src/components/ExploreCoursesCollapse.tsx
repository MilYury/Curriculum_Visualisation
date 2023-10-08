import React from 'react';
import { type RootState } from '../store/reducers';
import { useSelector } from 'react-redux';
import { Collapse } from 'antd';
import SPK from './SPK';

const { Panel } = Collapse;

const ExploreCoursesCollapse: React.FC = () => {
  const selectedCourse = useSelector(
    (state: RootState) => state.courses.selectedData
  );

  return (
    <div>
      <h2>{selectedCourse?.FullTitle ?? 'Course Title'}</h2>
      <Collapse accordion>
        {selectedCourse?.SPKs?.map((spk, index) => (
          <Panel header={spk.FullTitle} key={spk.StudyPackageCd}>
            <h3>Details:</h3>
            <p>Insert info about SPK here</p>
            <SPK spks={spk.RelatedSPK} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default ExploreCoursesCollapse;
