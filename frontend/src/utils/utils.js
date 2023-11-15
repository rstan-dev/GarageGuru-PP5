import { axiosReq } from "../api/axiosDefaults";
import jwtDecode from "jwt-decode"

/* Utility function to get more api data for use with Infinity Scroll.
 * This function updates the resource state with new results by appending them
 * to the existing results.
 */
export const fetchMoreData = async (resource, setResource) => {
    try {
      const { data } = await axiosReq.get(resource.next);
      setResource((prevResource) => ({
        ...prevResource,
        next: data.next,
        results: data.results.reduce((acc, cur) => {
            // Compares existing results to the new result by id, and either
            // returns the exisitng result or adds the new result to existing
            // array
          return acc.some((accResult) => accResult.id === cur.id)
            ? acc
            : [...acc, cur];
        }, prevResource.results),
      }));
    } catch (error) {}
  };

  /* Decodes the JWT refresh token and stores its expiration timestamp in local storage.
  */
  export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp)
  }

  /* Checks if the refresh token's timestamp is stored in local storage.
  */
  export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp")
  }

  /* Removes the stored refresh token's expiration timestamp from local storage.
  */
  export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp")
  }