import { axiosReq } from "../api/axiosDefaults";

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