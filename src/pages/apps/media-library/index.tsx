import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const MediaList = asyncComponent(() => import("@modules/apps/MediaLibrary/MediaList"));
export default AppPage(() => <MediaList />);
