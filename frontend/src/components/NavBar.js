import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/garageguru_logo.jpg";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
	useCurrentUser,
	useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import useToggleMenu from "../hooks/useToggleMenu";
import axios from "axios";
import { removeTokenTimestamp } from "../utils/utils";

/**
 * NavBar Component
 *
 * This component renders the navigation bar for the application. It displays different
 * navigation links based on whether a user is currently logged in or not.
 **/
const NavBar = () => {
	const currentUser = useCurrentUser();
	const setCurrentUser = useSetCurrentUser();
	const currentUserId = currentUser ? currentUser.pk : null;

	const { expanded, setExpanded, ref } = useToggleMenu();

	/*
    Handles user logout and
    removes TokenTimestamp
    */
	const handleLogOut = async () => {
		try {
			await axios.post("/dj-rest-auth/logout/");
			setCurrentUser(null);
			removeTokenTimestamp();
		} catch (err) {
			// console.log(err);
		}
	};

	/*
    Conditionally displays menu items to logged in users
    */
	const loggedInMenu = (
		<>
			<NavLink
				to='/jobs/addjob'
				className={`${styles.NavLinks} ${styles.AddJobIcon}`}
				activeClassName={styles.Active}>
				<i
					className='fa-solid fa-circle-plus'
					aria-label='add job'></i>
				<span className={styles.Label}>Add Job</span>
			</NavLink>
			<NavLink
				exact
				to='/'
				className={styles.NavLinks}
				activeClassName={styles.Active}>
				<i
					className='fa-solid fa-car'
					aria-label='all jobs'></i>
				<span className={styles.Label}>All Jobs</span>
			</NavLink>
			<NavLink
				to='/myjobs'
				className={styles.NavLinks}
				activeClassName={styles.Active}>
				<i
					className='fa-solid fa-clipboard-list'
					aria-label='my jobs'></i>
				<span className={styles.Label}>My Jobs</span>
			</NavLink>
			<NavLink
				to='/assigned'
				className={styles.NavLinks}
				activeClassName={styles.Active}>
				<i
					className='fa-solid fa-people-group'
					aria-label='assigned jobs'></i>
				<span className={styles.Label}>Assigned</span>
			</NavLink>
			<NavLink
				to='/watched'
				className={styles.NavLinks}
				activeClassName={styles.Active}>
				<i
					className='fa-solid fa-eye'
					aria-label='watched jobs'></i>
				<span className={styles.Label}>Watching</span>
			</NavLink>
			<NavLink
				to='/all-invoices'
				className={styles.NavLinks}
				activeClassName={styles.Active}>
				<i
					className='fa-solid fa-cash-register'
					aria-label='all invoices'></i>
				<span className={styles.Label}>Invoices</span>
			</NavLink>
			<NavLink
				to={"/login"}
				className={styles.NavLinks}
				activeClassName={styles.Active}
				onClick={handleLogOut}>
				<i
					className='fa-solid fa-power-off'
					aria-label='logout'></i>
				<span className={styles.Label}>Logout</span>
			</NavLink>
			<NavLink
				to={`/profile/${currentUserId}`}
				className={styles.NavLinks}
				activeClassName={styles.Active}>
				<i
					className='fa-solid fa-circle-user'
					aria-label='register'></i>
				<span className={styles.Label}>Profile</span>
				<span className={styles.Username}>
					Welcome: {currentUser?.username}
				</span>
			</NavLink>
		</>
	);

	/*
    Conditionally displays menu items to logged out users
    */
	const loggedOutMenu = (
		<>
			<NavLink
				to='/login'
				className={styles.NavLinks}
				activeClassName={styles.Active}>
				<i
					className='fa-solid fa-right-to-bracket'
					aria-label='login'></i>
				<span className={styles.Label}>Login</span>
			</NavLink>
			<NavLink
				to='/register'
				className={styles.NavLinks}
				activeClassName={styles.Active}>
				<i
					className='fa-solid fa-user-plus'
					aria-label='register'></i>
				<span className={styles.Label}>Register</span>
			</NavLink>
		</>
	);

	return (
		<Navbar
			className={styles.NavBar}
			expand='lg'
			fixed='top'
			expanded={expanded}>
			<Container>
				<NavLink to='/'>
					<Navbar.Brand>
						<img
							src={logo}
							alt='logo'
							height='50'
						/>
					</Navbar.Brand>
				</NavLink>
				<Navbar.Toggle
					aria-controls='basic-navbar-nav'
					ref={ref}
					onClick={() => setExpanded(!expanded)}
					className='bg-light'
				/>
				<Navbar.Collapse
					className={styles.NavbarCollapse}
					id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						{currentUser ? loggedInMenu : loggedOutMenu}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
