import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg" className='custom-nav'>
            <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    <Nav.Link as={Link} to="/classes">Classes</Nav.Link>
                    <Nav.Link as={Link} to="/schedule">Schedule</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/trainer-dashboard">Trainer Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/user-dashboard">User  Dashboard</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;