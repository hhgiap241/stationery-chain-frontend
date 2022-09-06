import React from 'react';
import {useLocation} from "react-router-dom";

const EditProduct = () => {
    const {state} = useLocation();
    console.log('edit product');
    const product = state.product;
    console.log(product);
    return (
        <div>

        </div>
    );
};

export default EditProduct;