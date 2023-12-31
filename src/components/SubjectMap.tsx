import React, { useEffect, useState } from 'react';
import Subject from './Subject';
import type ISubject from '../interfaces/ISubject';
import { Input, Pagination, Row, Col, Typography, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store/reducers';

const { Title } = Typography;

const SubjectMap: React.FC = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const initialPage = Number(localStorage.getItem('lastPage')) ?? 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const subjects = useSelector((state: RootState) => state.subjects);
  const searchValue = useSelector(
    (state: RootState) => state.subjects.searchValue
  );

  const filteredSubjects = subjects.data?.filter(
    (subject) =>
      subject.FullTitle.toLowerCase().includes(search.toLowerCase().trim()) ||
      subject.StudyPackageCd.toLowerCase().includes(search.toLowerCase().trim())
  );

  const subjectsPerPage = 20;
  const totalSubjects = filteredSubjects?.length ?? 0;

  const displayedSubjects = filteredSubjects?.slice(
    (currentPage - 1) * subjectsPerPage,
    currentPage * subjectsPerPage
  );

  useEffect(() => {
    localStorage.setItem('lastPage', currentPage.toString());
  }, [currentPage]);

  return (
    <>
      <Title level={2}>All Subject Information</Title>
      <Space direction="vertical" size={16}>
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
            dispatch({
              type: 'SET_SEARCH_VALUE_SUBJECT',
              payload: e.target.value
            });
          }}
        />
        <Row gutter={[16, 16]}>
          {displayedSubjects?.map((subject: ISubject, index: number) => (
            <Col
              key={index}
              className="custom-col"
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Subject {...subject} />
            </Col>
          ))}
        </Row>
        <Pagination
          current={currentPage}
          total={totalSubjects}
          pageSize={subjectsPerPage}
          onChange={(page) => {
            setCurrentPage(page);
          }}
          showSizeChanger={false}
        />
      </Space>
    </>
  );
};

export default SubjectMap;
