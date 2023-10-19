import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from "../assets/garageguru_logo.png"

const NavBar = () => {
  return (
    <Navbar expand="lg" fixed="top">
        <Container>
            <Navbar.Brand>
                <img src={logo} alt="logo" height="50" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link >
                    <i class="fa-solid fa-car"></i>  All Jobs
                </Nav.Link>
                <Nav.Link >
                    <i class="fa-solid fa-clipboard-list"></i> My Jobs
                </Nav.Link>
                <Nav.Link >
                    <i class="fa-solid fa-circle-plus"></i> Add Job
                </Nav.Link>
                <Nav.Link >
                    <i class="fa-solid fa-people-group"></i> Assigned
                </Nav.Link>
                <Nav.Link >
                    <i class="fa-solid fa-eye"></i> Watching
                </Nav.Link>
                <Nav.Link >
                    <i class="fa-solid fa-right-to-bracket"></i> Login
                </Nav.Link>
                <Nav.Link >
                    <i class="fa-solid fa-right-from-bracket"></i> Logout
                </Nav.Link>
                <Nav.Link >
                    <i class="fa-solid fa-user-plus"></i> Register
                </Nav.Link>
                <Nav.Link >
                    <i class="fa-solid fa-circle-user"></i> Profile
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar