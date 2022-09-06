import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import Error from "./components/error/Error";
import NavigationBar from "./components/home/NavigationBar";
import ProductList from "./components/product/ProductList";
import Management from "./components/admin/Management";
import CategoryList from "./components/category/CategoryList";
import EditProduct from "./components/product/EditProduct";
import RoleRoute from "./components/helper/RoleRoute";

function App() {
    return (
        <>
            <BrowserRouter>
                <NavigationBar/>
                <div className={"container-fluid"}>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/product"} element={<ProductList/>}/>
                        <Route path={"/category"} element={<CategoryList/>}/>
                        {/*// secure route*/}
                        <Route element={<RoleRoute role={'ADMIN'}/>}>
                            <Route path={"/management"} element={<Management/>}/>
                            <Route path={"/product/edit/:skuCode"} element={<EditProduct/>}/>
                        </Route>
                        <Route path={'*'} element={<Error/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </>

    )
}

export default App;
