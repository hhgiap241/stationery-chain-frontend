import axios from "axios";
import AuthService from "./AuthService";

const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const axiosInstance = axios.create();
const configure = () =>{
    axiosInstance.interceptors.request.use(config => {
        if(AuthService.isAuthenticated()){
            const callback = () => {
                config.headers.Authorization = `Bearer ${AuthService.getToken()}`;
                return config;
            }
            return AuthService.updateToken(callback);
        }
    });
}
const getAxiosInstance = () => axiosInstance;
const HttpService = {
    HttpMethods,
    configure,
    getAxiosInstance,
}
export default HttpService;
