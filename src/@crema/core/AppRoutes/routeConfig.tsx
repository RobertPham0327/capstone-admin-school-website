import React from 'react';
import { PiStudentFill } from "react-icons/pi";
import { MdOutlineFeed } from "react-icons/md";
import { GoGitPullRequest } from "react-icons/go";

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
        title: 'Class Management',
        messageId: 'sidebar.classManagement',
        type: 'collapse',
        icon: <PiStudentFill />,
        path: '/apps/class-management',
      },
      {
        id: 'request_management',
        title: 'Request Management',
        messageId: 'sidebar.requestManagement',
        type: 'collapse',
        icon: <GoGitPullRequest />,
        path: '/apps/request-management',
      }
    ],
  },
];
export default routesConfig;
