import React from "react";
import AppPage from  '@crema/core/AppLayout/AppPage';
import asyncComponent from "@crema/components/AppAsyncComponent";

const Page1 = asyncComponent(() => import('../../modules/sample/Page1'));
export default AppPage(() => <Page1 />);
