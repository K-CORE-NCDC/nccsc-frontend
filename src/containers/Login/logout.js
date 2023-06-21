import React,{useEffect} from 'react';
import config from '../../config'
import { logout } from "../../actions/api_actions";
import { useDispatch } from "react-redux";


const LogOutComponent = () => {

    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        };

    const dispatch = useDispatch();
    useEffect(()=>{
        deleteCookie('is_login')
        deleteCookie('username')
        deleteCookie('superuser')   
        dispatch(logout("POST",{}))
        window.location.href = config['basename']+"login/"
    },[])
    return ( <></> );
}

export default LogOutComponent;