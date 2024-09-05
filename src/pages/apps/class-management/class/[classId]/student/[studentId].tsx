import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const StudentDetail = asyncComponent(() => import('@modules/apps/ClassManagement/StudentDetail'));
export default AppPage(() => <StudentDetail />);
