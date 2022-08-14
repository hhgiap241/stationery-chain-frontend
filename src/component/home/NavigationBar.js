import React from 'react';
import {Container, Nav, NavDropdown} from "react-bootstrap";

const NavigationBar = () => {
    return (
        <NavigationBar bg="light" expand="lg">
            <Container>
                <NavigationBar.Brand href="#home">React-Bootstrap</NavigationBar.Brand>
                <NavigationBar.Toggle aria-controls="basic-navbar-nav" />
                <NavigationBar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </NavigationBar.Collapse>
            </Container>
        </NavigationBar>
    );
};

export default NavigationBar;