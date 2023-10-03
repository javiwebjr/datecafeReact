import { useEffect } from "react";
import axiosCliente from "../utils/axios";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
export const useAuth = ({middleware, url}) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();
    const {data: user, error, mutate} = useSWR('/api/user', () => 
        axiosCliente('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    );
    const login = async (datos, setErrores) => {
        try {
            const {data} = await axiosCliente.post('/api/login', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
            setTimeout(() => setErrores([]), 4000);
        }
    }
    const registro = async (datos, setErrores) => {
        try {
            const {data} = await axiosCliente.post('/api/register', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
            setTimeout(() => setErrores([]), 4000);
        }
    }
    
    const logout = async  () => {
        try {
            await axiosCliente.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(() => {
        if(middleware === 'guest' && url && user){
            navigate(url);
        }
        if(middleware === 'guest' && user && user.admin){
            navigate('/admin');
        }
        if(middleware === 'admin' && user && !user.admin){
            navigate('/');
        }
        if(middleware === 'auth' && error){
            navigate('/auth/login');
        }
    }, [user, error]);

    return {
        registro,
        login,
        logout,
        user,
        error

    }
}
