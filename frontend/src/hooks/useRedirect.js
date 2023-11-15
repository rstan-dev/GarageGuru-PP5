import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post('/dj-rest-auth/token/refresh/');
                // if user is logged in, the code will run
                if (userAuthStatus === 'loggedIn') {
                    history.goBack()
                }

            } catch(err) {
                // if user is not logged in, the code will run
                if (userAuthStatus === 'loggedOut' ) {
                    history.push('/login')
                }
            }
        }
        handleMount();
    }, [history, userAuthStatus])
};