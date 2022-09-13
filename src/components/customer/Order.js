import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, FloatingLabel, Form} from "react-bootstrap";
import OrderItem from "./OrderItem";
import HttpService from "../../services/HttpService";

const Order = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);
    const [customer, setCustomer] = React.useState({name: '', address: '', phone: ''});
    const products = location.state.products;
    console.log(products);
    const totalPrice = location.state.totalPrice;
    const handleCustomerNameChange = (event) => {
        setCustomer(prevState => {
            return {...prevState, name: event.target.value}
        });
    }
    const handleCustomerAddressChange = (event) => {
        setCustomer(prevState => {
            return {...prevState, address: event.target.value}
        });
    }
    const handleCustomerPhoneChange = (event) => {
        setCustomer(prevState => {
            return {...prevState, phone: event.target.value}
        });
    }
    const handleConfirmBtn = async (event) => {
        event.preventDefault();
        const order = {
            userId: localStorage.getItem('user_id'),
            customerName: customer.name,
            customerAddress: customer.address,
            customerPhone: customer.phone,
            totalPrice: totalPrice,
            orderLineItemsDtoList: products.map(product => {
                return {
                    skuCode: product.skuCode,
                    quantity: product.quantity,
                    price: product.price
                }
            })
        }
        console.log(order);
        try {
            let response = await HttpService.getAxiosInstance().post('http://localhost:8080/api/v1/order', order);
            console.log(response.data);
            navigate('/cart');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <h3 className={"text-center"}>Place order</h3>
            <Form>
                <FloatingLabel controlId="floatingCustomerName" label="User Name" className="mb-3">
                    <Form.Control type="text" placeholder="Enter user name"
                                  value={customer.name}
                                  onChange={event => handleCustomerNameChange(event)}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingCustomerPhone" label="Customer phone" className="mb-3">
                    <Form.Control type="text" placeholder="Enter customer phone"
                                  value={customer.phone}
                                  onChange={event => handleCustomerPhoneChange(event)}/>
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="floatingCustomerAddress"
                               label="Customer Address">
                    <Form.Control
                        type={"text"}
                        placeholder="Enter customer address"
                        value={customer.address}
                        onChange={event => handleCustomerAddressChange(event)}/>
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
                        products.map(product =>
                            <OrderItem product={product} key={product.id}/>
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
            <Button variant="primary" type="button" className={'float-end m-3'}
                    onClick={event => handleConfirmBtn(event)}>
                Confirm
            </Button>
        </>
    );
};

export default Order;