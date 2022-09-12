import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";

const CartItem = ({product}) => {
    console.log(product);
    const [defaultProduct, setDefaultProduct] = useState({name: '', price: 0, url: ''});
    useEffect(() => {
        HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/product/${product.skuCode}`)
            .then(res => {
                console.log(res.data);
                setDefaultProduct(res.data);
            }).catch(err => {
            console.log(err);
        });
    }, []);
    return (
        <tr>
            <td>
                <div className={"cart-info"}>
                    <img src={defaultProduct.url} alt={defaultProduct.name}/>
                    <div>
                        <p>{defaultProduct.name}</p>
                        <small>Price: ${defaultProduct.price}</small>
                        <br/>
                        <a href={""}>Remove</a>
                    </div>
                </div>
            </td>
            <td className={'center-input'}>
                <input type={'number'} value={product.quantity}/>
            </td>
            <td>{product.price}$</td>
        </tr>
    );
};

export default CartItem;