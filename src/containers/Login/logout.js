import React,{useEffect} from 'react';
import config from '../../config'
import { useHistory } from "react-router-dom";

const LogOutComponent = () => {

    let history = useHistory();
    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        };

    useEffect(()=>{
        deleteCookie('is_login')
        deleteCookie('username')
        deleteCookie('superuser')   
        history.push('/login/')
    },[])
    return ( <></> );
}

export default LogOutComponent;