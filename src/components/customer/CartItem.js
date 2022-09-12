import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";

const CartItem = React.memo(({cartItem, totalPrice, onPriceChange}) => {
    console.log(cartItem, totalPrice);
    const [defaultProduct, setDefaultProduct] = useState({name: '', price: 0, url: ''});
    const [product, setProduct] = useState(cartItem);
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
    }
    return (
        <tr>
            <td>
                <div className={'cart-info'}>
                    <img src={defaultProduct.url} alt={defaultProduct.name}/>
                    <div>
                        <p>{defaultProduct.name}</p>
                        <small>Unit Price: {defaultProduct.price}$</small>
                        <br/>
                        <a href={'#'}>Remove</a>
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