import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import Error from "./components/error/Error";
import NavigationBar from "./components/home/NavigationBar";

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavigationBar/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={'*'} element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default App;
