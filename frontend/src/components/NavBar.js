import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from "../assets/garageguru_logo.png"
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import useToggleMenu from "../hooks/useToggleMenu";
import axios from "axios";
import { removeTokenTimestamp } from '../utils/utils';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useToggleMenu();

    const handleLogOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null)
            removeTokenTimestamp()
        } catch (err) {
            console.log(err);
        }
    };

    const loggedInMenu = (
        <>
        <NavLink to="/" className={styles.NavLinks} >
            <i className="fa-solid fa-car"></i>
            <span className={styles.Label}>All Jobs</span>
        </NavLink>
        <NavLink to="/myjobs" className={styles.NavLinks}>
            <i className="fa-solid fa-clipboard-list"></i>
                <span className={styles.Label}>My Jobs</span>
        </NavLink>
        <NavLink to="/jobs/addjob" className={styles.NavLinks}>
            <i className="fa-solid fa-circle-plus"></i>
            <span className={styles.Label}>Add Job</span>
        </NavLink>
        <NavLink to="/assigned" className={styles.NavLinks}>
            <i className="fa-solid fa-people-group"></i>
            <span className={styles.Label}>Assigned</span>
        </NavLink>
        <NavLink to="/watched" className={styles.NavLinks} >
            <i className="fa-solid fa-eye"></i>
            <span className={styles.Label}>Watching</span>
        </NavLink>
        <NavLink to="/all-invoices" className={styles.NavLinks} >
            <i class="fa-solid fa-cash-register"></i>
            <span className={styles.Label}>Invoices</span>
        </NavLink>
        <NavLink
            to="/login"
            className={styles.NavLinks}
            onClick={handleLogOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className={styles.Label}>Logout</span>
        </NavLink>
        <NavLink to="/profile" className={styles.NavLinks}>
            <i className="fa-solid fa-circle-user"></i>
            <span className={styles.Label}>Profile</span>
        </NavLink>

        {currentUser?.username}
        </>
    )
    const loggedOutMenu = (
        <>
        <NavLink to="/login" className={styles.NavLinks}>
            <i className="fa-solid fa-right-to-bracket"></i>
            <span className={styles.Label}>Login</span>
        </NavLink>
        <NavLink to="/register" className={styles.NavLinks}>
            <i className="fa-solid fa-user-plus"></i>
            <span className={styles.Label}>Register</span>
        </NavLink>
        </>
    )

    return (
    <Navbar
        className={styles.NavBar}
        expand="lg"
        fixed="top"
        expanded={expanded}>
        <Container>
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="50" />
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                ref={ref}
                onClick={() => setExpanded(!expanded)}/>
            <Navbar.Collapse className={styles.NavbarCollapse} id="basic-navbar-nav">
                <Nav className="ml-auto">

                {currentUser ? loggedInMenu : loggedOutMenu}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar