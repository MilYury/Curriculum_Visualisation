import React from 'react';
import { Collapse } from 'antd';
import type ISPK from '../interfaces/ISPK';

const { Panel } = Collapse;

const SPK: React.FC<{ spks: ISPK[] }> = ({ spks }) => {
  return (
    <Collapse>
      {spks?.map((spk, index) => (
        <Panel header={<strong>{spk.FullTitle}</strong>} key={index}>
          <p>
            <strong>Id:</strong> {spk.StudyPackageCd}
          </p>
          <p>
            <strong>Name:</strong> {spk.FullTitle}
          </p>
          {spk.RelatedSubjects !== undefined &&
            spk.RelatedSubjects.length > 0 && (
              <Collapse>
                <Panel header={<strong>Subjects</strong>} key="subjects">
                  {spk.RelatedSubjects.map((subject, subjIndex) => (
                    <p key={subjIndex}>
                      <strong>{subject?.StudyPackageCd}</strong> -{' '}
                      {subject?.FullTitle}
                    </p>
                  ))}
                </Panel>
              </Collapse>
            )}
          {spk.RelatedSPK !== undefined && spk.RelatedSPK.length > 0 && (
            <SPK spks={spk.RelatedSPK} />
          )}
        </Panel>
      ))}
    </Collapse>
  );
};

export default SPK;
