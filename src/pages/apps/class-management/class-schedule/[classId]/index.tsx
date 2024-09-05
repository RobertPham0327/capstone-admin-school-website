import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ClassSchedule = asyncComponent(() => import('@modules/apps/ClassManagement/ClassSchedule'));
export default AppPage(() => <ClassSchedule />);
