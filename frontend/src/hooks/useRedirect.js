import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

/**
 * Custom hook to redirect the user based on their authentication status.
 **/
export const useRedirect = (userAuthStatus) => {
	const history = useHistory();

	useEffect(() => {
		/**
		 * Handles the initial mount logic for redirection based on
		 * the user's authentication status.
		 */
		const handleMount = async () => {
			try {
				await axios.post("/dj-rest-auth/token/refresh/");
				// if user is logged in, the code will attempt to refresh
				// the token and navigate back to the previous page.
				if (userAuthStatus === "loggedIn") {
					history.goBack();
				}
			} catch (err) {
				// if there is an error, or if user is not logged in, the
				// user will be redirected to the login page.
				if (userAuthStatus === "loggedOut") {
					history.push("/login");
				}
			}
		};
		handleMount();
	}, [history, userAuthStatus]);
};
