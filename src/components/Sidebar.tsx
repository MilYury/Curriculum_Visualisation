import { Card, Menu, type MenuProps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState } from '../store/reducers';

type MenuItem = Required<MenuProps>['items'][number];

interface MenuItemOptions {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: 'group';
  disabled?: boolean;
}

function getItem(options: MenuItemOptions): MenuItem {
  return {
    key: options.key,
    icon: options.icon,
    children: options.children,
    label: options.label,
    type: options.type,
    disabled: options.disabled
  } satisfies MenuItem;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const selectedSubject = useSelector(
    (state: RootState) => state.subjects.selectedData
  );

  const selectedCourse = useSelector(
    (state: RootState) => state.courses.selectedData
  );

  const items: MenuProps['items'] = [
    getItem({ label: 'Home', key: '' }),
    getItem({ label: 'Subjects', key: 'subjects' }),
    getItem({ label: 'Courses', key: 'courses' }),
    getItem({
      label: 'Explore Subjects',
      key: 'exploreSubjects',
      disabled: selectedSubject === undefined
    }),
    getItem({
      label: 'Explore Courses',
      key: 'exploreCourses',
      disabled: selectedCourse === undefined
    }),
    getItem({
      label: 'Explore Courses Collapse',
      key: 'exploreCoursesCollapse',
      disabled: selectedCourse === undefined
    }),
    getItem({
      label: 'Explore Courses Grid',
      key: 'exploreCoursesGrid',
      disabled: selectedCourse === undefined
    }),
    getItem({ label: 'Contact', key: 'contact' })
  ];

  const handleMenuItemClick = (menuItem: string): void => {
    navigate(menuItem);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    handleMenuItemClick(e.key);
  };

  return (
    <div style={{ width: 256 }}>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['home']}
        mode="inline"
        items={items}
      />
      {selectedSubject !== undefined && (
        <Card
          style={{ marginTop: '20px' }}
          title="Selected Subject"
          bordered={true}
        >
          {selectedSubject.FullTitle}
        </Card>
      )}
      {selectedCourse !== undefined && (
        <Card
          style={{ marginTop: '20px' }}
          title="Selected Course"
          bordered={true}
        >
          {selectedCourse.FullTitle}
        </Card>
      )}
    </div>
  );
};

export default Sidebar;
