import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import ExploreSubjects from './components/ExploreSubjects';
import SubjectMap from './components/SubjectMap';
import { Provider } from 'react-redux';
import store from './store/store';
import DataLoader from './components/DataLoader';
import CourseMap from './components/CourseMap';
import ExploreCourses from './components/ExploreCourses';
import ExploreCoursesCollapse from './components/ExploreCoursesCollapse';
import ExploreCoursesGrid from './components/ExploreCoursesGrid';
import { Spin } from 'antd';

const App: React.FC = () => {
  const [isDataLoaded, setIsDataLoaded] = useState<boolean | undefined>(
    undefined
  );

  return (
    <Provider store={store}>
      <DataLoader onDataLoaded={setIsDataLoaded} />
      {isDataLoaded !== undefined ? (
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/subjects" Component={() => <SubjectMap />} />
              <Route path="/courses" Component={() => <CourseMap />} />
              <Route path="/exploreSubjects" Component={ExploreSubjects} />
              <Route path="/exploreCourses" Component={ExploreCourses} />
              <Route
                path="/exploreCoursesCollapse"
                Component={ExploreCoursesCollapse}
              />
              <Route
                path="/exploreCoursesGrid"
                Component={ExploreCoursesGrid}
              />
              <Route path="/contact" Component={Contact} />
            </Routes>
          </Layout>
        </HashRouter>
      ) : (
        <div className="loading-container">
          <div className="loading-text">Loading...</div>
          <Spin size="large" />
        </div>
      )}
    </Provider>
  );
};

export default App;
