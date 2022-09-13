import React, {useCallback, useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";
import CartItem from "./CartItem";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0.00);
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();
    useEffect(() => {
        HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/cart/${userId}`)
            .then(res => {
                console.log(res.data);
                setProducts(res.data.cartItemList);
                res.data.cartItemList.forEach(item => {
                    setTotalPrice(prevState => prevState + item.price);
                });
            }).catch(err => {
            console.log(err);
        })
    }, []);
    const handleTotalPriceChange = useCallback((newPrice) => {
        setTotalPrice(parseFloat(newPrice.toFixed(2)));
    }, []);
    const handleCheckoutBtn = () => {
        navigate('/order', {state: {products, totalPrice}});
    }
    return (
        <>
            <h3 className={"text-center"}>Cart Page</h3>
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
                            <CartItem cartItem={product} totalPrice={totalPrice} onPriceChange={handleTotalPriceChange}
                                      key={product.id}/>
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
                        <td>{totalPrice}$</td>
                    </tr>
                    <tr>
                        <td>Shipping Price</td>
                        <td>10$</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{totalPrice + 10}$</td>
                    </tr>
                    </tbody>

                </table>
            </div>
            <Button className={'float-end m-3'} onClick={handleCheckoutBtn}>
                Checkout
            </Button>
        </>
    );
};

export default Cart;