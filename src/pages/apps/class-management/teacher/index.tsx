import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const TeacherListing = asyncComponent(() => import('@/modules/apps/ClassManagement/TeacherListing'));
export default AppPage(() => <TeacherListing />);
