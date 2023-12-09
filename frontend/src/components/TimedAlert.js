import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

/*
  Reusable timed alert component
*/
const TimedAlert = ({ message, variant, timeout }) => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setShow(false), timeout || 5000);
		return () => clearTimeout(timer);
	}, [timeout]);

	return show ? <Alert variant={variant}>{message}</Alert> : null;
};

export default TimedAlert;
