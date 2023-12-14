import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from './apiConfig';

export const loginUser = async (email, password, navigate) => {
    const response = await axios.post(`${BASE_URL}/api/login`, { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });


    // Assuming the response contains necessary user and token data
    const { user, succes, token, message } = await response.data;
    if (succes) {
        localStorage.setItem('token', token);
        toast.success(message);
        navigate('/home');
        return user;
    } else {
        toast.error(message);
        return null;
    }
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    return token !== null && token.length > 0;
}
export default isAuthenticated;
