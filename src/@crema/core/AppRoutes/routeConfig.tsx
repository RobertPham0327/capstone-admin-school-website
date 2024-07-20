import React from 'react';
import { PiStudentBold } from "react-icons/pi";

const routesConfig = [
  {
    id: 'app',
    title: 'Menu',
    messageId: 'sidebar.navigation.menu',
    type: 'group',
    children: [
      {
        id: 'class_management',
        title: 'Class management',
        messageId: 'sidebar.classManagement',
        type: 'collapse',
        icon: <PiStudentBold />,
        children: [
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
      // {
      //   id: 'page-2',
      //   title: 'Page 2',
      //   messageId: 'sidebar.sample.page2',
      //   type: 'item',
      //   icon: <BiAlignLeft />,
      //   path: '/sample/page-2',
      // },
    ],
  },
];
export default routesConfig;
