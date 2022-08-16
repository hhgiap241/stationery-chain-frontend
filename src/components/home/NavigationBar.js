import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../../react-1-logo.svg';
import AuthService from "../../services/AuthService";


const NavigationBar = ({keycloak}) => {
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
                    <NavDropdown title="Students" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={'/students'}>
                            Manage Students
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/students/id-cards'}>
                            Manage Student Id Cards
                        </NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as={Link} to={'/students/add'}>
                            Add New Student
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{paddingRight: '3rem'}}>
                        Hello, {AuthService.getUsername()} |
                    </Navbar.Text>
                    <Button variant="outline-info" onClick={() => AuthService.doLogout()}>Logout</Button>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NavigationBar;