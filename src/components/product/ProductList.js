import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";
import ProductItem from "./ProductItem";
import {Button, Form, Pagination, PageItem} from "react-bootstrap";

const ProductList = () => {
    const [response, setResponse] = useState({products: [], totalItems: 0, totalPages: 0, currentPage: 0});
    const [products, setProducts] = useState(response.products);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    useEffect(() => {
        HttpService.getAxiosInstance().get('http://localhost:8080/api/v1/product?page=0')
            .then(res => {
                setResponse(res.data);
                setProducts(res.data.products);
                console.log(res.data);
            }).catch(err => {
            console.log(err);
            console.log(err.response.data);
        });
        HttpService.getAxiosInstance().get('http://localhost:8080/api/v1/category')
            .then(res => {
                res.data.unshift({id: "all-category", name: "All"});
                setCategories(prevState => {
                    return res.data.map(category => {
                        return {...category, checked: false}
                    })
                });
                console.log(res.data);
            }).catch(err => {
            console.log(err);
            console.log(err.response.data);
        });
    }, []);
    const handleFilterProduct = async (event) => {
        event.preventDefault();
        // filter product by category
        try {
            let response = await HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/product/filter?category=${selectedCategory}`);
            console.log("filter product by category");
            setProducts(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    const handleCategoryChange = (categoryName) => {
        setSelectedCategory(categoryName);
        setCategories(prevState => {
            return prevState.map(category => {
                if (category.name === categoryName) {
                    return {...category, checked: true}
                } else {
                    return {...category, checked: false}
                }
            })
        });
    }
    const handlePagination = async (page) => {
        console.log(page);
        try {
            let response = await HttpService.getAxiosInstance().get(`http://localhost:8080/api/v1/product?page=${page}`);
            console.log("pagination");
            setResponse(response.data);
            setProducts(response.data.products);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className={"row pb-3"}>
            <div className={"col-3 category-border"}>
                <h3 className={"text-center"}>Product Sorting</h3>
                <Form>
                    {categories.map(category => {
                            return (
                                <Form.Check
                                    type={"radio"}
                                    key={category.id}
                                    id={category.id}
                                    label={category.name}
                                    checked={category.checked}
                                    onChange={() => handleCategoryChange(category.name)}
                                />
                            )
                        }
                    )}
                    <Button onClick={event => handleFilterProduct(event)}>Submit</Button>
                </Form>
            </div>
            <div className={"col-8"}>
                <div className={"row"}>
                    {
                        products.map(product => {
                            return (
                                <div className={"col-sm-4 pb-3"} key={product.id}>
                                    <ProductItem product={product}/>
                                </div>
                            )
                        })
                    }
                </div>
                <Pagination>
                    <Pagination.Prev/>
                    {
                        response.totalPages > 0 && Array.from(Array(response.totalPages).keys()).map(page => {
                            return (
                                <PageItem key={page} active={page === response.currentPage} onClick={() => handlePagination(page)}>
                                    {page + 1}
                                </PageItem>
                            )
                        })
                    }
                    <Pagination.Next/>
                </Pagination>
            </div>
        </div>
    );
};

export default ProductList;