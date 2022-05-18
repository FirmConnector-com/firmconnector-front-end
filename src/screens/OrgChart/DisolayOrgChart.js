import React, { useEffect, useState } from "react";
import "./styles.css";
import OrganizationChart from "@dabeng/react-orgchart";
import Layout from "../../components/Layouts/WithAuth/Layout";
import { useAuthContext } from "../../context/AuthContext";
import getOrganizationChart from "../../apis/getOrganizationChart";
import { PROFILE_IMAGE_BASE } from "../../config/env";

const DisolayOrgChart = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const [isLoading, setIsLoading] = useState(true);
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    if (user_slug !== undefined) {
      Promise.all([getOrganizationChart(user_slug)])
        .then(async ([data]) => {
          if (data?.data?.graphData) {
            setIsLoading(false);
            setOrgData(data?.data?.graphData);
          } else {
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [user_slug]);

  const renderNode = ({ nodeData }) => {
    return (
      <div className="org-node-container">
        <div className="org-person">
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundPosition: "center",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("${
                PROFILE_IMAGE_BASE + nodeData.profile_image_path
              }")`,
            }}
          />
        </div>
        <div className="org-name">{nodeData.profile_name}</div>
        <div className="org-title">{nodeData.user_role_title}</div>
        {nodeData?.children && (
          <div
            className="org-node-children"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              let childNodes = document.getElementById(nodeData.id)
                .parentElement.childNodes;
              if (childNodes[1].className.includes("hidden")) {
                childNodes[0].className = "oc-node";
                childNodes[1].className = "";
              } else {
                childNodes[0].className = "oc-node isChildrenCollapsed";
                childNodes[1].className = "hidden";
              }
            }}
          >
            {nodeData.children.length} Reportees
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      {!isLoading ? (
        <OrganizationChart
          datasource={orgData}
          chartClass="sekure-org-chart"
          pan={true}
          zoom={true}
          NodeTemplate={renderNode}
        />
      ) : null}
    </Layout>
  );
};

export default DisolayOrgChart;
