import React, {useEffect, useState} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Keycloak from "keycloak-js";
import {Button} from "react-bootstrap";
import axios from "axios";

const initOptions = {
    url: "http://localhost:8180/auth/",
    realm: "stationery-realm",
    clientId: "react-client",
    onLoad: "login-required",
}
const keycloak = new Keycloak(initOptions);
keycloak.init({onLoad: initOptions.onLoad})
    .then((authenticated) => {
        alert('authenticated');
        localStorage.setItem('accessToken', keycloak.token);
        localStorage.setItem('refreshToken', keycloak.refreshToken);
        console.log(keycloak.token);
        setTimeout(() => {
            keycloak.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    console.log('Token refreshed');
                } else {
                    console.log('Token not refreshed, valid for ' + keycloak.tokenParsed.exp + ' seconds');
                }
            }).catch(err =>
                console.log(err)
            );
        }, 60000);
    }).catch(err => {
    console.log(err);
    alert('failed to authenticated');
})

function App() {
    const api = axios.create({
        baseURL: "http://localhost:8080/api/v1/customers",
    })
    const [customers, setCustomers] = useState([]);

    const testAPI = () => {
        setCustomers([]);
        api.get("/", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                console.log(res.data);
                setCustomers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <div>
            <Button variant="primary" onClick={() => keycloak.login()}>Login</Button>
            <Button variant="primary" onClick={() => keycloak.logout()}>Logout</Button>
            <Button onClick={testAPI}>Test API</Button>
            {
                customers.map(customer => {
                    return (
                        <div key={customer.id}>
                            {customer.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default App;
