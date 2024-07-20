import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Students = asyncComponent(() => import('../../modules/ClassManagement/Students/index'));
export default AppPage(() => <Students />);
