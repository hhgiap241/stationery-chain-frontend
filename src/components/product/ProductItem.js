import React from 'react';
import {Button, Card} from "react-bootstrap";
import {FaCartPlus} from "react-icons/fa";
import RenderOnRole from "../helper/RenderOnRole";
import {useNavigate} from "react-router-dom";

const ProductItem = ({product}) => {
    const navigate = useNavigate();
    const handleEditBtn = () => {
        navigate(`/product/edit/${product.skuCode}`);
    }
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.url} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description.slice(0, 60)}...</Card.Text>
                <Card.Text>
                    <FaCartPlus/>&nbsp;{product.price}$
                </Card.Text>
                <Button variant="primary">Add To Card</Button>
                <RenderOnRole role={"ADMIN"}>
                    <div className={"more-space"}/>
                    <Button variant="secondary" onClick={handleEditBtn}>Edit</Button>
                </RenderOnRole>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;