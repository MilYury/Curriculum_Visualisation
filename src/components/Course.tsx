import { Space, Card, Collapse, Tooltip } from 'antd';
import React, { type CSSProperties } from 'react';
import type ICourse from '../interfaces/ICourse';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store/reducers';
import Checkbox, { type CheckboxChangeEvent } from 'antd/es/checkbox';

const { Panel } = Collapse;

const Course: React.FC<ICourse> = ({
  StudyPackageCd,
  FullTitle,
  CreditPointValue,
  Subjects
}) => {
  const dispatch = useDispatch();
  const selectedCourse = useSelector(
    (state: RootState) => state.courses.selectedData
  );

  const titleStyle: CSSProperties = {
    wordWrap: 'break-word',
    display: 'block',
    overflow: 'visible'
  };

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
              <span style={titleStyle}>{FullTitle}</span>
            </Tooltip>
          }
          style={{ width: 350 }}
          extra={
            <Checkbox
              onChange={handleCheckboxChange}
              checked={selectedCourse?.StudyPackageCd === StudyPackageCd}
            ></Checkbox>
          }
        >
          <p>
            <strong>Id:</strong> {StudyPackageCd}
          </p>
          <p>
            <strong>Credit Point Value:</strong> {CreditPointValue}
          </p>
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
        </Card>
      </Space>
    </>
  );
};

export default Course;
