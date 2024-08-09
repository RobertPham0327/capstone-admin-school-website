import React from 'react';
import { PiStudentBold } from 'react-icons/pi';
import { MdOutlineFeed } from "react-icons/md";

const routesConfig = [
  {
    id: 'app',
    title: 'Menu',
    messageId: 'sidebar.navigation.menu',
    type: 'group',
    children: [
      {
        id: 'main_feed',
        title: 'Main Feed',
        messageId: 'sidebar.mainFeed',
        type: 'item',
        icon: <MdOutlineFeed />,
        path: '/apps/main-feed',
      },
      {
        id: 'class_management',
        title: 'Class management',
        messageId: 'sidebar.classManagement',
        type: 'collapse',
        icon: <PiStudentBold />,
        children: [
          {
            id: 'classes',
            title: 'Classes',
            messageId: 'sidebar.classManagement.classes',
            path: '/class-management/classes',
          },
          {
            id: 'students',
            title: 'Students',
            messageId: 'sidebar.classManagement.students',
            path: '/class-management/students',
          },
          {
            id: 'teachers',
            title: 'Teachers',
            messageId: 'sidebar.classManagement.teachers',
            path: '/class-management/teachers',
          },
        ],
      },
    ],
  },
];
export default routesConfig;
