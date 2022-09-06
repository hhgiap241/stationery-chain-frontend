import React from 'react';
import AuthService from "../../services/AuthService";
import NotAllowed from "../error/NotAllowed";
import {Outlet} from "react-router-dom";

const RoleRoute = ({role}) => {
    console.log('role = ', role);
    return (
        AuthService.hasRole(role) ? <Outlet/> : <NotAllowed/>
    )
}
export default RoleRoute;