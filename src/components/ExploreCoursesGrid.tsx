import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Space, List, Input } from 'antd';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/reducers';
import type ISPK from '../interfaces/ISPK';
import type ISubject from '../interfaces/ISubject';

const { Meta } = Card;

const ExploreCourseGrid: React.FC = () => {
  const selectedCourse = useSelector(
    (state: RootState) => state.courses.selectedData
  );

  const [search, setSearch] = useState('');
  const [allRelatedSubjects, setAllRelatedSubjects] = useState<ISubject[]>([]);

  useEffect(() => {
    const addedSubjectsSet = new Set<string>();

    const recursivelyGetRelatedSubjects = (spk: ISPK): ISubject[] => {
      let subjects: ISubject[] = [];

      spk.RelatedSubjects?.forEach((subject) => {
        if (!addedSubjectsSet.has(subject.StudyPackageCd)) {
          subjects.push(subject);
          addedSubjectsSet.add(subject.StudyPackageCd);
        }
      });

      if (spk.RelatedSPK !== undefined) {
        spk.RelatedSPK.forEach((relatedSpk) => {
          subjects = subjects.concat(recursivelyGetRelatedSubjects(relatedSpk));
        });
      }

      return subjects;
    };

    const subjects: ISubject[] = [];
    selectedCourse?.SPKs?.forEach((spk) => {
      subjects.push(...recursivelyGetRelatedSubjects(spk));
    });

    setAllRelatedSubjects(subjects);
  }, [selectedCourse?.SPKs]);

  const filteredSubjects = allRelatedSubjects.filter((subject) =>
    subject.FullTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>{selectedCourse?.FullTitle ?? 'Course Title'}</h2>
      <Input
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Space />
      <h3>Insert info about subject here</h3>
      <Row gutter={16}>
        {filteredSubjects?.map((subject) => (
          <Col span={8} key={subject.StudyPackageCd}>
            <Card hoverable>
              <Meta
                title={subject.FullTitle + ' - ' + subject.StudyPackageCd}
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
      </Row>
    </div>
  );
};

export default ExploreCourseGrid;
