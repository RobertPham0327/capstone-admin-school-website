import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ClassManagement = asyncComponent(() => import('../../../modules/apps/ClassManagement/ClassListing'));
export default AppPage(() => <ClassManagement />);
