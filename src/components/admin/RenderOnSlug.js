import React from 'react';
import AddProduct from "../product/AddProduct";
import AddCategory from "../category/AddCategory";
import EditInventory from "../product/EditInventory";
import InventoryList from "../product/InventoryList";
import OrderList from "./OrderList";

const RenderOnSlug = ({slug}) => {
    console.log(slug);
    switch (slug){
        case 'product/add':
            return <AddProduct/>
        case 'category/add':
            return <AddCategory/>
        case 'inventory':
            return <InventoryList/>
        case 'inventory/edit':
            return <EditInventory/>
        case 'order':
            return <OrderList/>
        default: return null;
    }
};

export default RenderOnSlug;