import React from 'react';
import {DropdownButton, Dropdown} from "react-bootstrap";

const Management = () => {
    return (
        <>
            <h1 className={'text-center'}>Admin Management Dashboard</h1>
            <div className={'row'}>
                <div className={'col-3'}>
                    <DropdownButton id="dropdown-basic-button" title="Product">
                        <Dropdown.Item href="#/action-1">Add New Product</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Add New Category</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className={'col-8'}>

                </div>
            </div>
        </>
    );
};

export default Management;