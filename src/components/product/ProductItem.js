import React from 'react';
import {Button, Card} from "react-bootstrap";

const ProductItem = ({product}) => {
    console.log(product);
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.url} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary">Add To Card</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;