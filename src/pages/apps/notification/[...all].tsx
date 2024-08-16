import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const Notification= asyncComponent(() => import("../../../modules/apps/Notification"), {
  ssr: false,
});
export default AppPage(() => <Notification />);
