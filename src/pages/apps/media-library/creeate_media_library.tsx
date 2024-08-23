import React from 'react';
import AppPage from '@crema/core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const CreateMediaLibrary = asyncComponent(() => import('../../../modules/apps/MediaLibrary/CreateMediaLibrary'), {
  ssr: false,
});
export default AppPage(() => <CreateMediaLibrary />);
