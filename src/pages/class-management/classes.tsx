import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Classes = asyncComponent(() => import('../../modules/ClassManagement/Classes/ClassListing'));
export default AppPage(() => <Classes />);
