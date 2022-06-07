import React from "react";
import SearchBlock from "../../components/Search/SearchBlock";
import Layout from "../../components/Layouts/WithAuth/Layout";

const SearchScreen = () => {
    return (
        <Layout pageTitle={"FirmConnector :: Search"}>
            <SearchBlock/>
        </Layout>
    );
};

export default SearchScreen;
