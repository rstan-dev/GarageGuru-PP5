import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from "../assets/garageguru_logo.png"
import styles from "../styles/NavBar.module.css"

const NavBar = () => {
  return (
    <Navbar  className={styles.NavBar} expand="md" fixed="top">
        <Container>
            <Navbar.Brand>
                <img src={logo} alt="logo" height="50" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link className={styles.NavLinks} >
                    <i class="fa-solid fa-car"></i>
                    <span className={styles.Label}>All Jobs</span>
                </Nav.Link>
                <Nav.Link className={styles.NavLinks}>                    <i class="fa-solid fa-clipboard-list"></i>
                <span className={styles.Label}>My Jobs</span>
                </Nav.Link>
                <Nav.Link className={styles.NavLinks}>
                    <i class="fa-solid fa-circle-plus"></i>
                    <span className={styles.Label}>Add Job</span>
                </Nav.Link>
                <Nav.Link className={styles.NavLinks}>
                    <i class="fa-solid fa-people-group"></i>
                    <span className={styles.Label}>Assigned</span>
                </Nav.Link>
                <Nav.Link className={styles.NavLinks} >
                    <i class="fa-solid fa-eye"></i>
                    <span className={styles.Label}>Watching</span>
                </Nav.Link>
                <Nav.Link className={styles.NavLinks}>
                    <i class="fa-solid fa-right-to-bracket"></i>
                    <span className={styles.Label}>Login</span>
                </Nav.Link>
                <Nav.Link className={styles.NavLinks}>
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span className={styles.Label}>Logout</span>
                </Nav.Link>
                <Nav.Link className={styles.NavLinks}>
                    <i class="fa-solid fa-user-plus"></i>
                    <span className={styles.Label}>Register</span>
                </Nav.Link>
                <Nav.Link className={styles.NavLinks}>
                    <i class="fa-solid fa-circle-user"></i>
                    <span className={styles.Label}>Profile</span>
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar