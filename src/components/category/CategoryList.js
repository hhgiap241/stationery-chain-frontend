import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";
import {Button, ListGroup} from "react-bootstrap";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        HttpService.getAxiosInstance().get('http://localhost:8080/api/v1/category')
            .then(res => {
                setCategories(res.data);
            }).catch(err => {
            console.log(err);
            console.log(err.response.data);
        });
    }, []);
    const deleteBtnHandler = (id) => {
        alert("Delete category " + id);
    }
    return (
        <>
            <h1 className={"text-center"}>Category List</h1>
            <ListGroup>
                {
                    categories.map(category => {
                        return (
                            <ListGroup.Item key={category.id}>
                                {category.name}
                                <Button variant={"danger"}
                                        className={"float-end"}
                                        onClick={() => deleteBtnHandler(category.id)}
                                >Delete
                                </Button>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </>
    );
};

export default CategoryList;