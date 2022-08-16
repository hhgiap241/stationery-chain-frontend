import React from 'react';
import AuthService from "../../services/AuthService";
import RenderOnRole from "../helper/RenderOnRole";

const Home = () => {

    return (
        <div>
            <RenderOnRole role={'ADMIN'}>
                <h1>Only available for admin</h1>
            </RenderOnRole>
            <h1>This is home page {AuthService.getUsername()}</h1>
        </div>
    );
};

export default Home;