import React from "react";

import TopBannerComponent from "./TopBanner";
import SelectOrganizationComponent from "./SelectOrganizationComponent";
import ThirdBlock from "./ThirdBlock";
import FourthBlock from "./FourthBlock";

const HomeComponent = () => {
  return (
    <>
      <TopBannerComponent />
      <SelectOrganizationComponent />
      <ThirdBlock />
      <FourthBlock />
    </>
  );
};

export default HomeComponent;
