import React from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import CheckoutItem from "./CheckoutItem";

const OrderDetail = () => {
    const [customer, setCustomer] = React.useState({name: '', address: '', phone: ''});
    const [products, setProducts] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0.00);
    return (
        <>
            <h3 className={"text-center"}>Place order</h3>
            <Form>
                <FloatingLabel controlId="floatingCustomerName" label="User Name" className="mb-3">
                    <Form.Control type="text" placeholder="Enter user name"
                                  value={customer.name}
                                  disabled={true}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingCustomerPhone" label="Customer phone" className="mb-3">
                    <Form.Control type="text" placeholder="Enter customer phone"
                                  value={customer.phone}
                                  disabled={true}/>
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="floatingCustomerAddress"
                               label="Customer Address">
                    <Form.Control
                        type={"text"}
                        placeholder="Enter customer address"
                        value={customer.address}
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
                        products.map(product =>
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
        </>
    )
};

export default OrderDetail;