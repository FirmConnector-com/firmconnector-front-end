import {NavIcon, NavItem, NavText} from "@trendmicro/react-sidenav";
import IconContainer from "../../../Iconcontainer/IconContainer";
import React from "react";
import "./LeftMenuCss.css"
import {NavLink} from "react-router-dom";

const NavItems = (props) => {
    return (
        <NavItem active={props.active} onSelect={props.onClick} eventKey={props.eventKey}
                 className="navItemWrapper">
            <NavIcon>
                <NavLink exact to={props.path}>
                    <div
                        className="sm-block animated-hover bg-muted-custom iconSetting">
                        <IconContainer
                            iconName={props.iconName}
                            color={props.iconColor}
                        />
                    </div>
                </NavLink>
            </NavIcon>
            <NavText>
                <NavLink exact to={props.path}>
                    {props.name}
                </NavLink>
            </NavText>
        </NavItem>
    );
}
export default NavItems;