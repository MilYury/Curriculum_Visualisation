import { Space, Card, Collapse, Tooltip } from 'antd';
import React from 'react';
import type ICourse from '../interfaces/ICourse';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store/reducers';
import Checkbox, { type CheckboxChangeEvent } from 'antd/es/checkbox';
import SPK from './SPK';

const { Panel } = Collapse;

const Course: React.FC<ICourse> = ({
  StudyPackageCd,
  FullTitle,
  CreditPointValue,
  Subjects,
  SPKs
}) => {
  const dispatch = useDispatch();
  const selectedCourse = useSelector(
    (state: RootState) => state.courses.selectedData
  );

  const handleCheckboxChange = (e: CheckboxChangeEvent): void => {
    if (e.target.checked) {
      dispatch({ type: 'SET_SELECTED_COURSE', payload: StudyPackageCd });
    } else {
      dispatch({ type: 'CLEAR_SELECTED_COURSE' });
    }
  };

  return (
    <>
      <Space direction="vertical" size={16}>
        <Card
          title={
            <Tooltip title={FullTitle}>
              <div
                style={{
                  display: 'block',
                  width: '300px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {FullTitle}
              </div>
            </Tooltip>
          }
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          extra={
            <Checkbox
              onChange={handleCheckboxChange}
              checked={selectedCourse?.StudyPackageCd === StudyPackageCd}
            ></Checkbox>
          }
        >
          <div style={{ overflowY: 'auto', flex: '1' }}>
            <p>
              <strong>Id:</strong> {StudyPackageCd}
            </p>
            <p>
              <strong>Credit Point Value:</strong> {CreditPointValue}
            </p>
            {SPKs?.length > 0 && <SPK spks={SPKs} />}
            {Subjects?.length > 0 && (
              <Collapse key={StudyPackageCd}>
                <Panel header={<strong>Subjects</strong>} key="1">
                  {Subjects.map((subject, index) => (
                    <p key={index}>
                      <strong>{subject?.StudyPackageCd}</strong> -{' '}
                      {subject?.FullTitle}
                    </p>
                  ))}
                </Panel>
              </Collapse>
            )}
          </div>
        </Card>
      </Space>
    </>
  );
};

export default Course;
