import React from 'react';
import {useKeycloak} from "@react-keycloak/web";

const Home = () => {
    const { keycloak } = useKeycloak()

    const handleLoginBtn = () => {
        keycloak.login();
    }
    const handleLogoutBtn = () => {
        if(keycloak.authenticated) {
            keycloak.logout();
        }
    }
    return (
        <div>
            <h1>This is home page</h1>
            <button onClick={handleLoginBtn}>Login</button>
            <br/>
            <button onClick={handleLogoutBtn}>Logout</button>
        </div>
    );
};

export default Home;