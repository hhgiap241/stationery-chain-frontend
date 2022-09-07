import React from 'react';
import {DropdownButton, Dropdown} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import RenderOnSlug from "./RenderOnSlug";
import AddProduct from "../product/AddProduct";

const Management = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <>
            <h1 className={'text-center'}>Admin Management Dashboard</h1>
            <div>
                <DropdownButton id="dropdown-basic-button" title="Product">
                    <Dropdown.Item as={Link} to={'/management/product/add'}>Add New Product</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/management/category/add'}>Add New Category</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className={"mb-3"}>
                <RenderOnSlug slug={location.pathname.split("/").splice(2).join("/")}/>
            </div>
        </>
    );
};

export default Management;