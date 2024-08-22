import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const EatingSchedule = asyncComponent(() => import('@modules/apps/ClassManagement/EatingSchedule'));
export default AppPage(() => <EatingSchedule />);
