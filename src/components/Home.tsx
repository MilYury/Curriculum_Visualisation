import { Space } from 'antd';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Curriculum Visualiser</h1>
      <p>
        First, select a Subject or a Course as to be tracked. Then you can
        explore either using a few different types of visualisations
      </p>
      <Space />
      <p style={{ color: 'red' }}>
        To find subject prerequisites, click
        <strong>&quot;Subjects&quot;</strong> and select the subject you would
        like to view by clicking on the top right of the subject card.
        Afterwards, go to the <strong>&quot;Explore Subjects&quot;</strong> page
      </p>
      <Space />
      <p style={{ color: 'red' }}>
        To find the contents of a course, click
        <strong>&quot;Courses&quot;</strong> and select the course you would
        like to view by clicking on the top right of the course card.
        Afterwards, either go to the
        <strong>&quot;Explore Courses&quot;</strong> page or the
        <strong>&quot;Explore Courses Grid&quot;</strong> page
      </p>
    </div>
  );
};

export default Home;
