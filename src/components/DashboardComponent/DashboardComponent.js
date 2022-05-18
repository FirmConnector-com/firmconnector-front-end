import React from "react";
import { Link } from "react-router-dom";

import PageHeader from "../CommonComponent/PageHeader";
import IconContainer from "../Iconcontainer/IconContainer";
import GroupedBar from "../Charts/GroupedBar";
import ProfileImageMd from "../CommonComponent/ProfileImageMd";
import DashboardBlockTitle from "../CommonComponent/DashboardBlockTitle";

import user1 from "../../assets/images/user1.jpg";
import user2 from "../../assets/images/user2.jpg";
import user3 from "../../assets/images/user3.jpg";
import user4 from "../../assets/images/user4.jpg";
import user5 from "../../assets/images/user5.jpg";

const DashboardComponent = () => {
  const userList = [
    {
      name: "Debasish Paul",
      role: "Senior Application Developer",
      image: user1,
      profile: "resources/details/debasish-paul",
    },
    {
      name: "Aaron Mclaughlin",
      role: "Senior Consultant",
      image: user2,
      profile: "resources/details/debasish-paul",
    },
    {
      name: "Petter Wood",
      role: "Account Manager",
      image: user3,
      profile: "resources/details/debasish-paul",
    },
    {
      name: "St John",
      role: "Front End Engineer",
      image: user4,
      profile: "resources/details/debasish-paul",
    },
    {
      name: "Malina Weissman",
      role: "Drama Actress",
      image: user5,
      profile: "resources/details/debasish-paul",
    },
  ];

  const displayUserList = () => {
    return (
      <>
        {userList.map((item, key) => {
          return (
            <tr key={key.toString()}>
              <td className="py-3">
                <div className="align-items-center position-relative">
                  <div className="d-flex align-items-center">
                    <Link to={item.profile}>
                      <ProfileImageMd imgSrc={item.image} />
                    </Link>

                    <div className="profile-details-holder mx-2">
                      <div className="d-block">
                        <span className="text-dark-custom fw-medium-custom">
                          {item.name}
                        </span>
                      </div>
                      <div className="d-block">
                        <span className="text-muted-custom ">{item.role}</span>
                      </div>
                    </div>
                    <div className="d-flex col justify-content-end">
                      <div className="icon-holder-sm icon-holder-info">
                        <IconContainer iconName={"FiSettings"} />
                      </div>
                      <div className="icon-holder-sm icon-holder-danger ms-3">
                        <IconContainer iconName={"FiTrash"} />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <>
      <PageHeader pageHeaderTitle={"Dashboard"} subText={"Recent activities"} />
      <div className="row g-0">
        <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-3 pe-lg-2 pe-xl-2 pe-xxl-2">
          <div className="card-custom">
            <div className="card-body">
              <div className="card-title-custom">
                <p className="card-title-custom">User Activity</p>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-3 pe-lg-2 pe-xl-2 pe-xxl-2 ps-lg-2 ps-xl-2 ps-xxl-2">
          <div className="card-custom card-stretch">
            <div className="card-body">
              <p className="card-title-custom">Today's To Do</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-3 ps-lg-2 ps-xl-2 ps-xxl-2">
          <div className="card-custom mb-3">
            <div className="card-body">
              <div className="d-flex">
                <div className="icon-holder-sm icon-holder-info me-3">
                  <IconContainer iconName={"FiFileText"} />
                </div>
                <div className="d-block">
                  <div className="card-title-custom">$3240</div>
                  <div className="d-block">
                    <span className="text-dark-custom">Earned this month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-custom">
            <div className="card-body">
              <div className="d-flex">
                <div className="icon-holder-sm icon-holder-warning me-3">
                  <IconContainer iconName={"FiFileText"} />
                </div>
                <div className="d-block">
                  <div className="card-title-custom">53</div>
                  <div className="d-block">
                    <span>New resource added this week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-0">
        <div className="col-12 col-lg-6 col-xl-6 col-xxl-6 mb-3 pe-lg-2 pe-xl-2 pe-xxl-2">
          <div className="block-custom my-3">
            <div className="card-custom">
              <div className="card-header-custom py-2">
                <DashboardBlockTitle
                  title={"Latest Activities"}
                  subTitle={"Newly added resources this week"}
                />
              </div>
              <div className="card-body">
                <div className="table-responsive-sm">
                  <table className="table table-borderless">
                    <tbody>{displayUserList()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 col-xl-6 col-xxl-6 ps-lg-2 ps-xl-2 ps-xxl-2">
          <div className="block-custom my-3">
            <div className="card-custom">
              <div className="card-header-custom py-2">
                <DashboardBlockTitle
                  title={"Resource Availability"}
                  subTitle={"Newly added resources this week"}
                />
              </div>
              <div className="card-body">
                <GroupedBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
