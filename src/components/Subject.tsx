import { Space, Card, Collapse, Checkbox, Tooltip } from 'antd';
import React from 'react';
import type ISubject from '../interfaces/ISubject';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store/reducers';
import { type CheckboxChangeEvent } from 'antd/es/checkbox';

const { Panel } = Collapse;
const Subject: React.FC<ISubject> = ({
  StudyPackageCd,
  FullTitle,
  CreditPointValue,
  PreRequisites
}) => {
  const dispatch = useDispatch();
  const selectedSubject = useSelector(
    (state: RootState) => state.subjects.selectedData
  );

  const handleCheckboxChange = (e: CheckboxChangeEvent): void => {
    if (e.target.checked) {
      dispatch({ type: 'SET_SELECTED_SUBJECT', payload: StudyPackageCd });
    } else {
      dispatch({ type: 'CLEAR_SELECTED_SUBJECT' });
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
              checked={selectedSubject?.StudyPackageCd === StudyPackageCd}
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
            {PreRequisites?.length > 0 && (
              <Collapse key={StudyPackageCd}>
                <Panel header={<strong>PreRequisites</strong>} key="1">
                  {PreRequisites.map((subject: ISubject) => (
                    <p key={subject.StudyPackageCd}>
                      <strong>{subject.StudyPackageCd}</strong> -{' '}
                      {subject.FullTitle}
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

export default Subject;
