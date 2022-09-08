import React, {useEffect, useState} from 'react';
import HttpService from "../../services/HttpService";
import {Table} from "react-bootstrap";

const InventoryList = () => {
    const [inventories, setInventories] = useState([]);
    useEffect(() => {
        HttpService.getAxiosInstance().get('http://localhost:8080/api/v1/inventory/all')
            .then(res => {
                setInventories(res.data);
                console.log(res.data);
            }).catch(err => {
            console.log(err);
        })
    }, []);
    return (
        <>
            <h3 className={"text-center"}>Inventory List</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th colSpan={2}>Stock Keeping Unit</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {
                    inventories.map(inventory => {
                        return (
                            <tr key={inventory.id}>
                                <td>{inventory.id}</td>
                                <td colSpan={2}>{inventory.skuCode}</td>
                                <td>{inventory.quantity}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </>
    );
};

export default InventoryList;