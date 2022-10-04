import React, {useEffect} from 'react';
import HttpService from "../../services/HttpService";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import OrderStatus from "../helper/OrderStatus";


const OrderList = () => {
    const [orders, setOrders] = React.useState([]);
    const [status, setStatus] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    useEffect(() => {
        HttpService.getAxiosInstance().get('http://localhost:8080/api/v1/order')
            .then(response => {
                // add new field to element of order
                const newOrders = response.data.map(order => {
                    return {...order, isStatusChange: false}
                });
                setOrders(newOrders);
                // get order id and status then add to status array
                const newStatus = response.data.map(order => {
                    return {id: order.id, status: order.orderStatus}
                });
                setStatus(newStatus);
                console.log(response.data);
            }).catch(error => {
            console.log(error);
        });
    }, []);
    const handleOrderStatusChange = (event, orderId) => {
        setStatus(status.map(order => {
            if (order.id === orderId) {
                order.status = event.target.value;
            }
            return order;
        }));
        orders.filter(order => order.id === orderId).map(order => {
            order.orderStatus = event.target.value;
            order.isStatusChange = true;
            return order;
        });
    }
    const handleSaveBtn = () => {
        console.log('new', orders);
        orders.filter(order => order.isStatusChange).map(order => {
            HttpService.getAxiosInstance().put(`http://localhost:8080/api/v1/order/${order.id}?status=${order.orderStatus}`)
                .then(response => {
                    console.log(response.data);
                    setSuccess(true);
                }).catch(error => {
                setSuccess(false);
                console.log(error);
            });
            return order;
        });
    }
    return (
        <>
            <h3 className={"text-center"}>Order List</h3>
            {success && <div className={'alert alert-success'}>Saved!</div>}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map(order => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.userId}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.customerName}</td>
                                <td>{order.customerPhone}</td>
                                <td>{order.totalPrice}$</td>
                                <td>
                                    <Form.Select aria-label="Order status select"
                                                 value={status.find(s => s.id === order.id).status}
                                                 onChange={event => handleOrderStatusChange(event, order.id)}>
                                        {
                                            Object.keys(OrderStatus).map(status => {
                                                return <option key={status} value={status}>{status}</option>
                                            })
                                        }
                                    </Form.Select>
                                </td>
                                <td><Link to={`/order/${order.id}`}>View</Link></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <Button className={'float-end'} onClick={handleSaveBtn}>Save</Button>
        </>
    );
};

export default OrderList;