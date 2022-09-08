import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";
import {Button, FloatingLabel, Form, Image} from "react-bootstrap";

const AddCategory = () => {
    const [category, setCategory] = useState({name: ''});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const handleCategoryNameChange = (event) => {
        setCategory(prevState => {
            return {...prevState, name: event.target.value}
        });
    }
    const handleSubmitBtn = async (event) => {
        event.preventDefault();
        try {
            let response = await HttpService.getAxiosInstance().post('http://localhost:8080/api/v1/category', category);
            setSuccess(true);
            setError('');
            console.log(response.data);
        } catch (e) {
            setSuccess(false);
            setError(e.response.data["Product_Error: "]);
            console.log(e);
        }
    }
    return (
        <>
            <h3 className={"text-center"}>Add New Category</h3>
            {success && <div className={'alert alert-success'}>Saved!</div>}
            {error && <div className={'alert alert-danger'}>{error}</div>}
            <Form>
                <FloatingLabel controlId="floatingProductName" label="Category Name" className="mb-3">
                    <Form.Control type="text" placeholder="Enter category name"
                                  value={category.name}
                                  onChange={event => handleCategoryNameChange(event)}/>
                    <Form.Text className="text-muted">
                        Category name is unique.
                    </Form.Text>
                </FloatingLabel>
                <Button variant="primary" type="button" onClick={event => handleSubmitBtn(event)}>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default AddCategory;