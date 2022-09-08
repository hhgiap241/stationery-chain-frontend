import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";
import {Button, FloatingLabel, Form} from "react-bootstrap";

const EditInventory = () => {
    const [inventory, setInventory] = useState({skuCode: '', quantity: 0, isNew: true});
    const [products, setProducts] = useState([]);
    useEffect(() => {
        let result;
        const fetchProductData = async () => {
            const productResponse = await HttpService.getAxiosInstance().get('http://localhost:8080/api/v1/product');
            setProducts(productResponse.data);
            return productResponse.data;
        }
        const fetchInventoryData = async () => {
            result = await fetchProductData();
            console.log(result);
            const inventoryResponse = await HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/inventory/${result.at(0).skuCode}`);
            setInventory({...inventoryResponse.data, isNew: false});
        }
        fetchInventoryData()
            .catch(err => {
                setInventory({skuCode: result.at(0).skuCode, quantity: 0, isNew: true});
                console.log(err);
            })
    }, []);
    const productSelectHandler = (event) => {
        // fetch the quantity of current product in inventory service
        const skuCode = event.target.value;
        HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/inventory/${skuCode}`)
            .then(res => {
                setInventory({...res.data, isNew: false});
            }).catch(err => {
            setInventory({skuCode: skuCode, quantity: 0, isNew: true});
            console.log(err);
        });
    }
    const handleProductQuantityChange = (event) => {
        setInventory(prevState => {
            return {...prevState, quantity: event.target.value};
        })
    }
    const submitBtnHandler = event => {
        event.preventDefault();
        console.log(inventory);
        const data = {
            skuCode: inventory.skuCode,
            quantity: inventory.quantity
        };
        if (inventory.isNew) {
            // call post method
            HttpService.getAxiosInstance().post('http://localhost:8080/api/v1/inventory', data)
                .then(res => {
                    console.log(res.data);
                }).catch(err => {
                console.log(err);
            });
        } else {
            // cal put method
            HttpService.getAxiosInstance().put('http://localhost:8080/api/v1/inventory', data)
                .then(res => {
                    console.log(res.data);
                }).catch(err => {
                console.log(err);
            });
        }
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