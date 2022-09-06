import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../../react-1-logo.svg';
import AuthService from "../../services/AuthService";
import RenderOnRole from "../helper/RenderOnRole";


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
                    <RenderOnRole role={'ADMIN'}>
                        <Nav.Link as={NavLink} to={'/management'}>Management</Nav.Link>
                    </RenderOnRole>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{paddingRight: '1rem'}}>
                        Hello, {AuthService.getUsername()} |
                    </Navbar.Text>
                    <Button variant="outline-info" onClick={AuthService.doLogout}>Logout</Button>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NavigationBar;