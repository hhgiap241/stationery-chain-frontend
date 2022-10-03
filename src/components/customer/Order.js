import React, {useEffect, useState} from 'react';
import {Button, Table} from "react-bootstrap";
import HttpService from "../../services/HttpService";
import {Link} from "react-router-dom";

const Order = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/order/${userId}`)
            .then(res => {
                console.log(res.data);
                setOrders(res.data);
            }).catch(err => {
            console.log(err);
        })
    }, []);
    return (
        <>
            <h3 className={"text-center"}>Order Page</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Total Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map(order => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.orderStatus}</td>
                                <td>{order.customerName}</td>
                                <td>{order.customerPhone}</td>
                                <td>{order.totalPrice}$</td>
                                <td><Link to={`/order/${order.id}`}>View</Link></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </>
    );
};

export default Order;