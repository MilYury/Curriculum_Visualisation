import React, { useEffect, useState } from 'react';
import { Input, Pagination, Row, Col, Typography, Space } from 'antd';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/reducers';
import type ICourse from '../interfaces/ICourse';
import Course from './Course';

const { Title } = Typography;

const CourseMap: React.FC = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const courses = useSelector((state: RootState) => state.courses);
  const coursesPerPage = 20;

  const filteredCourses = courses.data?.filter((course) =>
    course.FullTitle.toLowerCase().includes(search.toLowerCase().trim())
  );

  const coursesToDisplay = filteredCourses?.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  useEffect(() => {
    const lastPage = localStorage.getItem('lastPage');
    if (lastPage !== undefined) {
      setCurrentPage(Number(lastPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lastPage', currentPage.toString());
  }, [currentPage]);

  return (
    <>
      <Title level={2}>All Course Information</Title>
      <Space direction="vertical" size={16}>
        <Input
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Row gutter={[16, 16]}>
          {coursesToDisplay?.map((course: ICourse, index: number) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Course {...course} />
            </Col>
          ))}
        </Row>
        <Pagination
          current={currentPage}
          total={filteredCourses?.length ?? 0}
          pageSize={coursesPerPage}
          onChange={(page) => {
            setCurrentPage(page);
          }}
          showSizeChanger={false}
        />
      </Space>
    </>
  );
};

export default CourseMap;
