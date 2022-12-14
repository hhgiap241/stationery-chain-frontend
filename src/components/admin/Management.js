import React from 'react';
import {ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import RenderOnSlug from "./RenderOnSlug";

const Management = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <>
            <h1 className={'text-center'}>Admin Management Dashboard</h1>
            <div className={'mb-3 justify-content-center text-center'}>
                <DropdownButton id="product-dropdown-button" title="Product" as={ButtonGroup}>
                    <Dropdown.Item as={Link} to={'/management/product/add'}>Add New Product</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/management/category/add'}>Add New Category</Dropdown.Item>
                </DropdownButton>
                <div className="more-space"/>
                <DropdownButton id="inventory-dropdown-button" title="Inventory" as={ButtonGroup}>
                    <Dropdown.Item as={Link} to={'/management/inventory'}>View All Inventory</Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/management/inventory/edit'}>Update Product Quantity</Dropdown.Item>
                </DropdownButton>
                <div className="more-space"/>
                <DropdownButton id="order-dropdown-button" title="Order" as={ButtonGroup}>
                    <Dropdown.Item as={Link} to={'/management/order'}>View All Order</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className={'mb-3'}>
                <RenderOnSlug slug={location.pathname.split("/").splice(2).join("/")}/>
            </div>
        </>
    );
};

export default Management;