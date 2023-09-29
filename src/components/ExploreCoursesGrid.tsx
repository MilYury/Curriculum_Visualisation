import React from 'react';
import { Card, Row, Col, Space, List } from 'antd';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/reducers';

const { Meta } = Card;

const ExploreCourseGrid: React.FC = () => {
  const selectedCourse = useSelector(
    (state: RootState) => state.courses.selectedData
  );

  return (
    <div>
      <h2>{selectedCourse?.FullTitle ?? 'Course Title'}</h2>
      <Space />
      <h3>Insert info about subject here</h3>
      <Row gutter={16}>
        {(selectedCourse?.Subjects ?? []).map((subject) => (
          <Col span={8} key={subject.StudyPackageCd}>
            <Card hoverable>
              <Meta
                title={subject.FullTitle}
                description={'Add description here'}
              />
              {subject.PreRequisites !== undefined &&
                subject.PreRequisites.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <strong>Prerequisites:</strong>
                    <List
                      size="small"
                      dataSource={subject.PreRequisites}
                      renderItem={(prerequisite) => (
                        <List.Item>{prerequisite.FullTitle}</List.Item>
                      )}
                    />
                  </div>
                )}
            </Card>
          </Col>
        ))}
        {(selectedCourse?.SPKs ?? []).map((spk) => (
          <Col span={8} key={spk.StudyPackageCd}>
            <Card hoverable>
              <Meta
                title={spk.FullTitle}
                description={'Add description for SPK here'}
              />
              {spk.RelatedSPK !== undefined && spk.RelatedSPK.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <strong>Related SPKs:</strong>
                  <List
                    size="small"
                    dataSource={spk.RelatedSPK}
                    renderItem={(RelatedSPK) => (
                      <List.Item>{RelatedSPK.FullTitle}</List.Item>
                    )}
                  />
                </div>
              )}
              {spk.RelatedSubjects !== undefined &&
                spk.RelatedSubjects.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <strong>Subjects:</strong>
                    <List
                      size="small"
                      dataSource={spk.RelatedSubjects}
                      renderItem={(subject) => (
                        <List.Item>{subject.FullTitle}</List.Item>
                      )}
                    />
                  </div>
                )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ExploreCourseGrid;
