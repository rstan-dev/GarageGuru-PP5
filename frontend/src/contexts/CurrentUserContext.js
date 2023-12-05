import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { axiosRes, axiosReq } from "../api/axiosDefaults";
import { shouldRefreshToken, removeTokenTimestamp } from "../utils/utils";

// Context for providing and consuming the current user's data.
export const CurrentUserContext = createContext();
// Context for providing and consuming the function to set the current user's data.
export const SetCurrentUserContext = createContext();

// Custom hook to access the current user's data from the context.
export const useCurrentUser = () => useContext(CurrentUserContext);
// Custom hook to access the function for setting the current user's data.
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Provider component for current user context.
export const CurrentUserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const history = useHistory();

	// Handles initial mounting logic.
	// Fetches the current user's data from the backend.
	const handleMount = async () => {
		try {
			const { data } = await axiosRes.get("/dj-rest-auth/user");
			setCurrentUser(data);
		} catch (err) {
			console.log(err);
		}
	};

	// Effect to handle component mounting and invoke the mount handler.
	useEffect(() => {
		handleMount();
	}, []);

	useMemo(() => {
		axiosReq.interceptors.request.use(
			// Request interceptor to refresh token if necessary before each request.
			async (config) => {
				if (shouldRefreshToken()) {
					try {
						await axios.post("/dj-rest-auth/token/refresh/");
					} catch (err) {
						setCurrentUser((prevCurrentUser) => {
							if (prevCurrentUser) {
								history.push("/login");
							}
							return null;
						});
						removeTokenTimestamp();
						return config;
					}
				}
				return config;
			},
			(err) => {
				return Promise.reject(err);
			}
		);

		// Response interceptor to handle 401 Unauthorized errors.
		// Attempts to refresh token on 401 responses.
		axiosRes.interceptors.response.use(
			(response) => response,
			async (err) => {
				if (err.response?.status === 401) {
					try {
						await axios.post("/dj-rest-auth/token/refresh/");
					} catch (err) {
						setCurrentUser((prevCurrentUser) => {
							if (prevCurrentUser) {
								history.push("/login");
							}
							return null;
						});
						removeTokenTimestamp();
					}
					return axios(err.config);
				}
				return Promise.reject(err);
			}
		);
	}, [history]);

	// Renders the context providers with the current user and setter function.
	return (
		<CurrentUserContext.Provider value={currentUser}>
			<SetCurrentUserContext.Provider value={setCurrentUser}>
				{children}
			</SetCurrentUserContext.Provider>
		</CurrentUserContext.Provider>
	);
};
