import React from 'react';

const Home = ({keycloak}) => {

    return (
        <div>
            <h1>This is home page {keycloak.tokenParsed.preferred_username}</h1>
        </div>
    );
};

export default Home;