import React from "react";
import ProfileImageSmall from "../../../CommonComponent/ProfileImageSmall";
import {useAuthContext} from "../../../../context/AuthContext";
import {Link} from "react-router-dom";
import Logo from "../../../../assets/images/Company_logo.png";
import IconContainer from "../../../Iconcontainer/IconContainer";

import "./header.css";

const Header = () => {
    const {userDetails} = useAuthContext();
    const loggedinUserDetails = JSON.parse(userDetails);

    return (
        <div className="header-dashboard pb-2 pt-2 " style={{zIndex: "1"}}>
            <div className="container d-flex">
                <div className="col-1 d-flex align-items-center">
                    <div
                        data-bs-toggle="offcanvas"
                        href="#offcanvasExample"
                        aria-controls="offcanvasExample"
                        className="cursor-pointer"
                    >
                        <IconContainer iconName={"FiAlignJustify"} color="var(--white)"/>
                    </div>
                </div>
                <div className="col-8 d-flex align-items-center">
                    <Link to="/">
                        <div className="logo-top-sm">
                            <img src={Logo} className="img-fluid" alt="Firmconnector"/>
                        </div>
                    </Link>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center">
                    <div>
                        <ProfileImageSmall
                            imgSrc={loggedinUserDetails.profile_image_path}
                            linkUrl={"/profile-settings"}
                        />
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //
        //     <div style={{display: "flex"}}>
        //         <div style={{
        //             display: 'flex',
        //             height: '100vh',
        //             overflow: 'scroll initial',
        //             zIndex: "1",
        //             float: "left",
        //             position: "fixed",
        //         }}>
        //             <CDBSidebar textColor="#fff" backgroundColor="#333">
        //                 <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}></CDBSidebarHeader>
        //                 <CDBSidebarContent className="sidebar-content">
        //                     <CDBSidebarMenu>
        //                         <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
        //                         <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
        //                         <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
        //                         <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
        //                         <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
        //                     </CDBSidebarMenu>
        //                 </CDBSidebarContent>
        //             </CDBSidebar>
        //         </div>
        //         <div className="main-content" style={{background: "red"}}>
        //
        //         </div>
        //
        //     </div>
        // </div>

    );
};

export default Header;
