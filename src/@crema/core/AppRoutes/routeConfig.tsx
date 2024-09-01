import React from 'react';
import { PiChalkboardTeacher, PiStudentFill, PiUser } from "react-icons/pi";
import { MdOutlineFeed } from "react-icons/md";
import { GoGitPullRequest } from "react-icons/go";
import { BsBell } from "react-icons/bs";
import { MdOutlinePermMedia } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";

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
        icon: <PiChalkboardTeacher />,
        // path: '/apps/class-management',
        children: [
          {
            id: 'class_listing',
            title: 'Class',
            messageId: 'sidebar.classManagement.classes',
            type: 'collapse',
            icon: <GoProjectRoadmap />,
            path: '/apps/class-management/class',
          },
          {
            id: 'teacher_listing',
            title: 'Teacher',
            messageId: 'sidebar.classManagement.teachers',
            type: 'collapse',
            icon: <PiStudentFill/>,
            path: '/apps/class-management/teacher',
          },
        ]
      },
      {
        id: 'request_management',
        title: 'Request Management',
        messageId: 'sidebar.requestManagement',
        type: 'collapse',
        icon: <GoGitPullRequest />,
        path: '/apps/request-management',
      },
      {
        id: 'notification',
        title: 'Notification',
        messageId: 'sidebar.notification',
        type: 'collapse',
        icon: <BsBell />,
        path: '/apps/notification',
      },
      {
        id: 'media_library',
        title: "Media Library",
        messageId: "sidebar.mediaLibrary",
        type: "collapse",
        icon: <MdOutlinePermMedia />,
        path: "/apps/media-library",
      }
    ],
  },
];
export default routesConfig;
