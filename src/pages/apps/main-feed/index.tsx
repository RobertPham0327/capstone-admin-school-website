import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const MainFeed = asyncComponent(() => import("../../../modules/apps/MainFeed"));
export default AppPage(() => <MainFeed />);
