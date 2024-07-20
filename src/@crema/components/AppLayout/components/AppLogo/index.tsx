import React from "react";
import { useSidebarContext } from "@crema/context/AppContextProvider/SidebarContextProvider";
import { StyledAppLogo } from "./index.styled";

type AppLogoProps = {
  hasSidebarColor?: boolean;
};
const AppLogo: React.FC<AppLogoProps> = ({ hasSidebarColor }) => {
  const { sidebarColorSet } = useSidebarContext();
  return (
    <StyledAppLogo>
      {hasSidebarColor && sidebarColorSet.mode === "dark" ? (
        <img src="/assets/images/mykids.svg" alt="crema-logo" />
      ) : (
        <img src="/assets/images/mykids.svg" alt="crema-logo" style={{ width: 100, height: 100}} />
      )}
    </StyledAppLogo>
  );
};

export default AppLogo;
