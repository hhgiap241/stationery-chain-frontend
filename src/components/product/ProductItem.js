import React, {useState} from 'react';
import {Button, Card, Toast, ToastContainer} from "react-bootstrap";
import {FaCartPlus} from "react-icons/fa";
import RenderOnRole from "../helper/RenderOnRole";
import {useNavigate} from "react-router-dom";
import Role from "../helper/Role";
import HttpService from "../../services/HttpService";

const ProductItem = ({product}) => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const handleEditBtn = () => {
        navigate(`/product/edit/${product.skuCode}`);
    }
    const hideToast = () => setShowToast(false);
    const addProductHandler = () => {
        console.log(product);
        const data = {
            'userId': localStorage.getItem('user_id'),
            'cartItemList': [
                {
                    'skuCode': product.skuCode,
                    'price': product.price,
                    'quantity': 1
                }
            ]
        }
        console.log(data);
        HttpService.getAxiosInstance().post('http://localhost:8080/api/v1/cart', data)
            .then(res => {
                console.log(res.data);
                setShowToast(true);
            }).catch(err => {
            console.log(err);
        });
    }
    return (
        <>
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={product.url} style={{height: '178px', width: '286px'}}/>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description.slice(0, 60)}...</Card.Text>
                    <Card.Text>
                        <FaCartPlus/>&nbsp;{product.price}$
                    </Card.Text>
                    <Button variant="primary" onClick={addProductHandler}>Add To Card</Button>
                    <RenderOnRole role={Role.ADMIN}>
                        <div className={"more-space"}/>
                        <Button variant="secondary" onClick={handleEditBtn}>Edit</Button>
                    </RenderOnRole>
                </Card.Body>
            </Card>
            <ToastContainer className={'p-3'} position={'bottom-end'}>
                <Toast show={showToast} onClose={hideToast}>
                    <Toast.Header  aria-live="polite"
                                   aria-atomic="true"
                                   className="bg-dark position-relative"
                                   style={{color: "white"}}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto"><FaCartPlus style={{paddingRight: '3px'}}/> Success</strong>
                        <small>1 min ago</small>
                    </Toast.Header>
                    <Toast.Body>Add product to cart successfully!</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default ProductItem;