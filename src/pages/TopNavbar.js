import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import NavDropdown from 'react-bootstrap/NavDropdown';

const TopNavbar = () => {


    const { lineitems } = useContext(ShopContext);
    return (
        <Navbar bg="light" expand="lg" style={{
            position: 'fixed', zIndex: '1000000', width: '100%', top: '0px'
        }}>
            <Container>
                <Navbar.Brand href="#collection">Headless Shopify</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="/collection">Collection</Nav.Link>
                        <Nav.Link href="/cart">Cart <sup>({lineitems.length})</sup></Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default TopNavbar;