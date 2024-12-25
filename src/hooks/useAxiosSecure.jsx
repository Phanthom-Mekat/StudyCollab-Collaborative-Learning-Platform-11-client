import axios from 'axios';
import  { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/provider/AuthProvider';


const axiosInstance = axios.create({
    baseURL: 'https://batcht-10-assignment-11-server.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            // console.log('api response error status', error.status);
            if (error.status === 401 || error.status === 403) {
                logOut()
                    .then(() => {
                        // redirect to the login page
                        navigate('/auth/login');
                    })
                    .catch(err => console.log(err))
            }
            return Promise.reject(error);
        })
    }, [navigate, logOut])

    return axiosInstance;
};

export default useAxiosSecure;



/**
 * axios: get, post, put/patch, delete --> easier
 * interceptor: client ----------|---------------> server
 * client <------------------|------------------Server
 * in the interceptor for response == needs two function 
 * 
*/