import React from 'react';
import AddProduct from "../product/AddProduct";
import AddCategory from "../category/AddCategory";

const RenderOnSlug = ({slug}) => {
    console.log(slug);
    switch (slug){
        case 'product/add':
            return <AddProduct/>
        case 'category/add':
            return <AddCategory/>
        default: return null;
    }
};

export default RenderOnSlug;