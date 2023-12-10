import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.Footer}>
			<div>© 2023 Russell Smith</div>
			<div>
				<a href="https://www.linkedin.com/in/russellstanleysmith/" target="_blank" rel="noopener noreferrer">
					<i className='fa-brands fa-linkedin'></i>
				</a>
			</div>
			<div>
				<a href="https://github.com/rstan-dev" target="_blank" rel="noopener noreferrer">
					<i className='fa-brands fa-square-github'></i>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
