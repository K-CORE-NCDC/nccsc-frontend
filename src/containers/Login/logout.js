import React,{useEffect} from 'react';
import config from '../../config'


const LogOutComponent = () => {

    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        };

    useEffect(()=>{
        deleteCookie('is_login')
        deleteCookie('username')
        deleteCookie('superuser')   
        window.location.href = config['basename']+"login/"
    },[])
    return ( <></> );
}

export default LogOutComponent;