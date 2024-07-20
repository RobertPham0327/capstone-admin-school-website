import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Teacherds = asyncComponent(() => import('../../modules/ClassManagement/Teachers/index'));
export default AppPage(() => <Teacherds />);
