import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const RequestManagement = asyncComponent(
  () => import("../../../modules/apps/RequestManagement/index")
);
export default AppPage(() => <RequestManagement />);
