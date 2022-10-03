import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../../react-1-logo.svg';
import AuthService from "../../services/AuthService";
import RenderOnRole from "../helper/RenderOnRole";
import Role from "../helper/Role";
import {FaList, FaShoppingCart, FaUser} from "react-icons/all";


const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" style={{marginBottom: '13px'}}>
            <div className={'container-fluid'}>
                <Navbar.Brand as={NavLink} to={'/'}>
                    <img
                        alt="logo"
                        src={logo}
                        height={'40px'}
                        width={'40px'}/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to={'/'}>Home</Nav.Link>
                    <NavDropdown title={'Products'}>
                        <NavDropdown.Item as={Link} to={'/product'}>All Products</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/category'}>All Categories</NavDropdown.Item>
                    </NavDropdown>
                    <RenderOnRole role={Role.ADMIN}>
                        <Nav.Link as={NavLink} to={'/management'}>Management</Nav.Link>
                    </RenderOnRole>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <NavDropdown title={`Hello, ${AuthService.getUsername()}`} style={{color: "white", paddingRight: '1rem'}}>
                        <NavDropdown.Item as={Link} to={'/account'}>
                            <FaUser style={{paddingLeft: '5px'}} size={'25px'}/> Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/cart'}>
                            <FaShoppingCart style={{paddingLeft: '5px'}} size={'25px'}/> Cart
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/order'}>
                            <FaList style={{paddingLeft: '5px'}} size={'25px'}/> Order
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Button variant="outline-info" onClick={AuthService.doLogout}>Logout</Button>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NavigationBar;