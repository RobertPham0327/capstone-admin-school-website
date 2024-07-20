import React from 'react';
import { PiStudentBold } from "react-icons/pi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";

const routesConfig = [
  {
    id: 'app',
    title: 'Menu',
    messageId: 'sidebar.navigation.menu',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        messageId: 'sidebar.dashboard',
        type: 'item',
        icon: <TbDeviceDesktopAnalytics />,
        path: '/sample/page-1',
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
          }
        ]
      },
    ],
  },
];
export default routesConfig;
