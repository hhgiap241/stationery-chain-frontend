import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Keycloak from "keycloak-js";
import {Button} from "react-bootstrap";

const initOptions = {
    url: "http://localhost:8180/auth/",
    realm: "stationery-realm",
    clientId: "react-client",
    onLoad: "login-required",
}
const keycloak = new Keycloak(initOptions);
keycloak.init({onLoad: initOptions.onLoad})
    .then((authenticated) => {
        alert(authenticated ? 'authenticated' : 'not authenticated');
        localStorage.setItem('accessToken', keycloak.token);
        localStorage.setItem('refreshToken', keycloak.refreshToken);
        console.log(keycloak.token);
    }).catch(err => {
    console.log(err);
    alert('failed to authenticated');
})
function App() {
    return (
        <div>
            <Button variant="primary" onClick={() => keycloak.login()}>Login</Button>
            <Button variant="primary" onClick={() => keycloak.logout()}>Logout</Button>
        </div>
    )
}

export default App;
