import React from 'react';
import AuthService from "../../services/AuthService";

const Home = () => {

    return (
        <div>
            <h1>This is home page {AuthService.getUsername()}</h1>
        </div>
    );
};

export default Home;