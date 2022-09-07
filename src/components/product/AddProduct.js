import React, {useState, useEffect} from 'react';
import {Button, FloatingLabel, Form, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import HttpService from "../../services/HttpService";

const AddProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({name: '', description: '', price: '', category: '', url: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/021/545/490/original/509480_01.jpg.jpeg?action=crop&width=750'});
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    useEffect(() => {
        HttpService.getAxiosInstance().get('http://localhost:8080/api/v1/category')
            .then(res => {
                setCategories(res.data);
                console.log(res.data);
            }).catch(err => {
            console.log(err);
            console.log(err.response.data);
        });
    }, []);
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
        try{
            let response = await HttpService.getAxiosInstance().post('http://localhost:8080/api/v1/product', product);
            console.log(response.data);
            // redirect to product page
            navigate('/product');
        } catch (e) {
            console.log(e);
        }
    }
    const fileSelectedHandler = (event) =>{
        console.log(event.target.files);
        setImage(event.target.files[0]); // get first file
    }
    const fileUploadHandler = () => {
        // const formData = new FormData();
        // formData.append('image', image, image.name);
        console.log('sending image', image);
    }
    return (
        <>
            <h1 className={"text-center"}>Add New Product</h1>
            <div className={"row"}>
                <div className={"col-3"}>
                    <Image src={product.url} rounded fluid/>
                    <Form.Group controlId="formFile" className="mb-3 mt-3">
                        <Form.Control type="file" onChange={event => fileSelectedHandler(event)} />
                    </Form.Group>
                    <Button variant={"outline-primary"} className={"w-100"} onClick={fileUploadHandler}>Upload Image</Button>
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

export default AddProduct;