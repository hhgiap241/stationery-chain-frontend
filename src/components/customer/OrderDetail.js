import React, {useEffect, useState} from 'react';
import {FloatingLabel, Form} from "react-bootstrap";
import CheckoutItem from "./CheckoutItem";
import HttpService from "../../services/HttpService";
import {useParams} from "react-router-dom";
import OrderTracking from "./OrderTracking";

const OrderDetail = () => {
    const [order, setOrder] = useState({
        customerName: '',
        customerAddress: 'customer.address',
        customerPhone: 'customer.phone',
        totalPrice: 0,
        orderLineItemsDtoList: []
    });
    const {id} = useParams();

    useEffect(() => {
        HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/order/detail/${id}`)
            .then(res => {
                setOrder(res.data);
                console.log(res.data);
            }).catch(err => {
            console.log(err);
        })
    }, []);
    return (
        <>
            <h3 className={"text-center"}>Order Detail (ID: {order.id})</h3>
            <OrderTracking date={order.createdAt} status={order.orderStatus}/>
            <Form>
                <FloatingLabel controlId="floatingCustomerName" label="User Name" className="mb-3">
                    <Form.Control type="text" placeholder="Enter user name"
                                  value={order.customerName}
                                  disabled={true}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingCustomerPhone" label="Customer phone" className="mb-3">
                    <Form.Control type="text" placeholder="Enter customer phone"
                                  value={order.customerPhone}
                                  disabled={true}/>
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="floatingCustomerAddress"
                               label="Customer Address">
                    <Form.Control
                        type={"text"}
                        placeholder="Enter customer address"
                        value={order.customerAddress}
                        disabled={true}/>
                </FloatingLabel>
            </Form>
            <div className={"cart-page"}>
                <table>
                    <tbody>
                    <tr className={'text-center'}>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                    {
                        order.orderLineItemsDtoList.map(product =>
                            <CheckoutItem product={product} key={product.id}/>
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
                        <td>{order.totalPrice}$</td>
                    </tr>
                    <tr>
                        <td>Shipping Price</td>
                        <td>10$</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{order.totalPrice + 10}$</td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </>
    )
};

export default OrderDetail;