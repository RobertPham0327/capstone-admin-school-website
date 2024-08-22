import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ClassDetail = asyncComponent(() => import('@modules/apps/ClassManagement/ClassDetail'));
export default AppPage(() => <ClassDetail />);
