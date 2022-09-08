import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";
import {Button, FloatingLabel, Form} from "react-bootstrap";

const EditInventory = () => {
    const [inventory, setInventory] = useState({skuCode: '', quantity: 0});
    const [products, setProducts] = useState([]);
    useEffect(() => {
        HttpService.getAxiosInstance().get('http://localhost:8080/api/v1/product')
            .then(res => {
                setProducts(res.data);
                console.log(res.data);
            }).catch(err => {
            console.log(err);
            console.log(err.response.data);
        });
        // HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/inventory/${products.at(0).skuCode}`)
        //     .then(res => {
        //         setInventory(res.data);
        //         console.log(res.data);
        //     }).catch(err => {
        //     console.log(err);
        // });
    }, []);
    const productSelectHandler = (event) => {
        setInventory(prevState => {
            return {...prevState, skuCode: event.target.value};
        })
    }
    const handleProductQuantityChange = (event) => {
        setInventory(prevState => {
            return {...prevState, quantity: event.target.value};
        })
    }
    const submitBtnHandler = event => {
        event.preventDefault();
        // call API to update quantity
        console.log(inventory);
    }
    return (
        <>
            <h3 className={"text-center"}>Update Product Quantity</h3>
            <div className={'row'}>
                <div className={'col-9'}>
                    <FloatingLabel controlId="floatingSelect" label="Product List" className={'mb-3'}>
                        <Form.Select aria-label="Floating label select example"
                                     onChange={event => productSelectHandler(event)}>
                            {
                                products.map(product => {
                                    return <option key={product.id} value={product.skuCode}>{product.name}</option>
                                })
                            }
                        </Form.Select>
                    </FloatingLabel>
                </div>
                <div className={'col-3'}>
                    <FloatingLabel className="mb-3" controlId="floatingProductQuantity" label="Product Quantity">
                        <Form.Control type={'number'} placeholder="Enter product quantity"
                                      value={inventory.quantity}
                                      onChange={event => handleProductQuantityChange(event)}/>
                    </FloatingLabel>
                    <Button variant={'primary'} type={'button'}
                            className={'float-end'}
                            onClick={event => submitBtnHandler(event)}>Submit</Button>
                </div>
            </div>
        </>
    );
};

export default EditInventory;