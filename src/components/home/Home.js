import React from 'react';
import AuthService from "../../services/AuthService";
import RenderOnRole from "../helper/RenderOnRole";
import {Button} from "react-bootstrap";
import HttpService from "../../services/HttpService";
import Role from "../helper/Role";

const Home = () => {
    const handleTestApiBtn = () => {
        HttpService.getAxiosInstance().get('http://localhost:8080/api/v1/customers')
            .then(res => {
                console.log(res.data);
            }).catch(err => {
            console.log(err);
        });
    }
    return (
        <div>
            <RenderOnRole role={Role.ADMIN}>
                <h1>Only available for admin</h1>
            </RenderOnRole>
            <h1>This is home page {AuthService.getUsername()}</h1>
            <Button onClick={handleTestApiBtn}>Test call api</Button>
        </div>
    );
};

export default Home;