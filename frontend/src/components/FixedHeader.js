import React from "react";
import styles from "../styles/FixedHeader.module.css";
import Container from "react-bootstrap/Container";

const FixedHeader = ({ text }) => {
	return (
		<div className={styles.FixedHeader}>
			<Container className={styles.ContainerBorder}>
				<div
					xs={12}
					sm={12}
					md={10}
					lg={10}
					xl={10}>
					<h1>{text}</h1>
				</div>
			</Container>
		</div>
	);
};

export default FixedHeader;
