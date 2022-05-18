import React from "react";
import PageTitleBlock from "./PageTitleBlock";
import "./static_page.css";

const StaticPageHeaderComponent = (props) => {
  const { title, description_sm } = props;

  return (
    <div className="static-page-header bg-black-custom">
      <div className="container py-5">
        <PageTitleBlock title={title} subText={description_sm} />
      </div>
    </div>
  );
};

export default StaticPageHeaderComponent;
