import React from "react";
import {useAuthContext} from "../../../../context/AuthContext";
import Swal from "sweetalert2";
import swalWithBootstrapButtons from "sweetalert2-react-content";

import "./LeftMenuCss.css";

const LogoutButtonComponent = () => {
    const {signOut} = useAuthContext();
    const MySwal = swalWithBootstrapButtons(Swal);

    const displayLogoutAlert = () => {
        MySwal.fire({
            title: "Are you sure?",
            text: "that you want to logout from your account",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, logout!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            confirmButtonColor: "var(--danger)",
            cancelButtonColor: "var(--black)",
        }).then((result) => {
            if (result.isConfirmed) {
                signOut();
            }
        });
    };

    return (
        <div
            className="d-flex align-items-center cursor-pointer"
            onClick={() => displayLogoutAlert()}
        >
            <div>
                <span className="text-white-custom">Logout</span>
            </div>
        </div>
    );
};

export default LogoutButtonComponent;
