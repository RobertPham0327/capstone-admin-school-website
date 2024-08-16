import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const MediaLibrary = asyncComponent(() => import("../../../modules/apps/MediaLibrary/index"));
export default AppPage(() => <MediaLibrary />);
