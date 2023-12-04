import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for managing the toggle state of a menu.
 *
 * This hook provides the expanded state and a method to set this state for a menu.
 * It also handles closing the menu when a click is detected outside of the menu element.
 **/
const useToggleMenu = () => {
	const [expanded, setExpanded] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		/**
		 * Handles click events on the document.
		 * Closes the menu if the click is outside the menu element.
		 **/
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setExpanded(false);
			}
		};
		document.addEventListener("mouseup", handleClickOutside);
		return () => {
			document.removeEventListener("mouseup", handleClickOutside);
		};
	}, [ref]);

	return { expanded, setExpanded, ref };
};

export default useToggleMenu;
