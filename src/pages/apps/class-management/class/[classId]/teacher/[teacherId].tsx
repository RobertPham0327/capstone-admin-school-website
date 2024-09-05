import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const TeacherDetail = asyncComponent(() => import('@modules/apps/ClassManagement/TeacherDetail'));
export default AppPage(() => <TeacherDetail />);
