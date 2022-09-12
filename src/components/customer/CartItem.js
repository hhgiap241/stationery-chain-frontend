import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const CartItem = React.memo(({cartItem, totalPrice, onPriceChange}) => {
    console.log(cartItem, totalPrice);
    const [defaultProduct, setDefaultProduct] = useState({name: '', price: 0, url: ''});
    const [product, setProduct] = useState(cartItem);
    const navigate = useNavigate();
    useEffect(() => {
        HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/product/${product.skuCode}`)
            .then(res => {
                console.log(res.data);
                setDefaultProduct(res.data);
            }).catch(err => {
            console.log(err);
        });
    }, []);
    const handleQuantityChange = (event) => {
        const newQuantity = event.target.value;
        const newPrice = (newQuantity * defaultProduct.price).toFixed(2);
        if (product.quantity < newQuantity) {
            const updatePrice = (newQuantity - product.quantity) * defaultProduct.price;
            onPriceChange(totalPrice + updatePrice);
        } else {
            const updatePrice = (product.quantity - newQuantity) * defaultProduct.price;
            onPriceChange(totalPrice - updatePrice);
        }
        setProduct(prevState => {
            return {...prevState, quantity: newQuantity, price: newPrice}
        });
        const cartItem = {
            id: product.id,
            quantity: newQuantity,
            price: newPrice,
            skuCode: product.skuCode,
        };
        console.log(cartItem);
        const userId = localStorage.getItem('user_id');
        HttpService.getAxiosInstance().put(`http://localhost:8080/api/v1/cart/${userId}`, cartItem)
            .then(res => {
                console.log('Updated');
                console.log(res.data);
            }).catch(err => {
            console.log(err);
        });
    }
    const handleRemoveCartItemBtn = () => {
        const cartItem = {
            id: product.id,
            quantity: 0,
            price: 0,
            skuCode: product.skuCode,
        };
        console.log(cartItem);
        const userId = localStorage.getItem('user_id');
        HttpService.getAxiosInstance().put(`http://localhost:8080/api/v1/cart/${userId}`, cartItem)
            .then(res => {
                console.log('Deleted');
                console.log(res.data);
                navigate(0);
            }).catch(err => {
            console.log(err);
        });
    }
    return (
        <tr>
            <td>
                <div className={'cart-info'}>
                    <img src={defaultProduct.url} alt={defaultProduct.name}/>
                    <div>
                        <p style={{fontSize: '20px', marginBottom: '0px'}}>{defaultProduct.name}</p>
                        <small>Unit Price: {defaultProduct.price}$</small>
                        <br/>
                        <Button variant={'outline-danger'} style={{padding: '3px'}} onClick={handleRemoveCartItemBtn}>Remove</Button>
                    </div>
                </div>
            </td>
            <td className={'center-input'}>
                <input type={'number'} value={product.quantity}
                       onChange={e => handleQuantityChange(e)}
                />
            </td>
            <td>{product.price}$</td>
        </tr>
    );
});

export default CartItem;