import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";
import {ListGroup} from "react-bootstrap";

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
    return (
        <>
            <h1 className={"text-center"}>Category List</h1>
            <ListGroup>
                {
                    categories.map(category => {
                        return (
                            <ListGroup.Item key={category.id}>{category.name}</ListGroup.Item>
                        )
                    })
                }
            </ListGroup>

        </>
    );
};

export default CategoryList;