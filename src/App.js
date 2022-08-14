import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./component/home/Home";
import Error from "./component/error/Error";
import NavigationBar from "./component/home/NavigationBar";
import keycloak from "./keycloak";

function App() {
    return (
        <BrowserRouter>
            <NavigationBar keycloak={keycloak}/>
            <Routes>
                <Route path={"/"} element={<Home keycloak={keycloak}/>}/>
                <Route path={'*'} element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
