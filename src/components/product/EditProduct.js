import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, FloatingLabel, Form, Image, InputGroup} from "react-bootstrap";
import HttpService from "../../services/HttpService";
import data from "bootstrap/js/src/dom/data";

// update name, description, price, category, image url
const EditProduct = () => {
    const {skuCode} = useParams();
    const navigate = useNavigate();
    console.log(skuCode);
    const [product, setProduct] = useState({name: '', description: '', price: '', category: '', url: ''});
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/product/${skuCode}`)
            .then(res => {
                setProduct(res.data);
                console.log(res.data);
            }).catch(err => {
            console.log(err);
            console.log(err.response.data);
        });
        HttpService.getAxiosInstance().get('http://localhost:8080/api/v1/category')
            .then(res => {
                setCategories(res.data);
                console.log(res.data);
            }).catch(err => {
            console.log(err);
            console.log(err.response.data);
        });
    }, []);
    console.log(product);
    console.log(categories);
    const handleProductNameChange = (event) => {
        setProduct(prevState => {
            return {...prevState, name: event.target.value}
        });
    }
    const handleProductDescriptionChange = (event) => {
        setProduct(prevState => {
            return {...prevState, description: event.target.value}
        });
    }
    const handleProductPriceChange = (event) => {
        setProduct(prevState => {
            return {...prevState, price: event.target.value}
        });
    }
    const handleProductCategoryChange = (event) => {
        console.log(event.target.value);
        setProduct(prevState => {
            return {...prevState, categoryId: event.target.value}
        });
    }
    const handleSubmitBtn = async (event) => {
        event.preventDefault();
        const updatedProduct = {
            name: product.name,
            url: product.url,
            description: product.description,
            price: product.price,
            categoryId: product.categoryId,
        }
        console.log(updatedProduct);
        try{
            let response = await HttpService.getAxiosInstance().put(`http://localhost:8080/api/v1/product/${skuCode}`, updatedProduct);
            console.log(response.data);
            // redirect to product page
            navigate(-1);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <h1 className={"text-center"}>Edit Product: {product.name}</h1>
            <div className={"row"}>
                <div className={"col-3"}>
                    <Image src={product.url} rounded fluid/>
                    <Button variant={"outline-primary"} className={"w-100 mt-3"}>Change Image</Button>
                </div>
                <div className={"col-9"}>
                    <Form>
                        <FloatingLabel controlId="floatingProductName" label="Product Name" className="mb-3">
                            <Form.Control type="text" placeholder="Enter product name"
                                          value={product.name}
                                          onChange={event => handleProductNameChange(event)}/>
                            <Form.Text className="text-muted">
                                Product name is unique.
                            </Form.Text>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="floatingProductDescription"
                                       label="Product Description">
                            <Form.Control
                                as="textarea"
                                placeholder="Enter product description"
                                value={product.description}
                                onChange={event => handleProductDescriptionChange(event)}
                                style={{height: '100px'}}
                            />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="floatingProductPrice" label="Product Price">
                            <Form.Control type={'number'} placeholder="Enter product price"
                                          value={product.price}
                                          onChange={event => handleProductPriceChange(event)}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingSelect" label="Product Category" className={'mb-3'}>
                            <Form.Select aria-label="Floating label select example"
                                         value={product.categoryId}
                                         onChange={event => handleProductCategoryChange(event)}>
                                {
                                    categories.map(category => {
                                        return <option key={category.id} value={category.id}>{category.name}</option>
                                    })
                                }
                            </Form.Select>
                        </FloatingLabel>
                        <Button variant="primary" type="button" onClick={event => handleSubmitBtn(event)}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default EditProduct;