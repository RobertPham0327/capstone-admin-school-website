import React from 'react';
import { PiStudentFill } from "react-icons/pi";
import { MdOutlineFeed } from "react-icons/md";
import { GoGitPullRequest } from "react-icons/go";
import { BsBell } from "react-icons/bs";
import { MdOutlinePermMedia } from "react-icons/md";

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
