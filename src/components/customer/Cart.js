import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";
import CartItem from "./CartItem";
import {Button} from "react-bootstrap";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const userId = localStorage.getItem('user_id');
    useEffect(() => {
        HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/cart/${userId}`)
            .then(res => {
                console.log(res.data);
                setProducts(res.data.cartItemList);
            }).catch(err => {
            console.log(err);
        })
    }, []);
    return (
        <>
            <h1>Cart page</h1>
            <div className={"cart-page"}>
                <table>
                    <tbody>
                    <tr className={'text-center'}>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                    {
                        products.map(product =>
                            <CartItem product={product} key={product.id}/>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className={'total-price'}>
                <table>
                    <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>200$</td>
                    </tr>
                    <tr>
                        <td>Shipping Price</td>
                        <td>200$</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>200$</td>
                    </tr>
                    </tbody>

                </table>
            </div>
            <Button className={'float-end m-3'}>
                Checkout
            </Button>
        </>
    );
};

export default Cart;