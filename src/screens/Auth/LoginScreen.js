import React from "react";

//Import component
import LoginComponent from "../../components/AuthComponent/LoginComponent";
import Layout from "../../components/Layouts/WithoutAuth/Layout";

const LoginScreen = () => {
    return (
        <Layout pageTitle={"Firmconnector :: Login"}>
            <LoginComponent/>
        </Layout>
    );
};

export default LoginScreen;
