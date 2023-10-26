
// IMPORTANT!!
 // Because this React app is running in the same workspace as the API,

 // there is no need to set a separate baseURL until you reach deployment.

 // Setting a baseURL before you reach deployment will cause errors


import axios from 'axios';


// axios.defaults.baseURL = 'https://8000-rstandev-garagegurupp5-g87jnb0h38p.ws-eu105.gitpod.io/';
// axios.defaults.headers.post['Content-type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();