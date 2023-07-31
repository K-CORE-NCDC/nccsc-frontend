import React,{useEffect} from 'react';
import config from '../../config'
import { useHistory } from "react-router-dom";

const LogOutComponent = () => {
  const history = useHistory()

    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        };

    useEffect(()=>{
        deleteCookie('is_login')
        deleteCookie('username')
        deleteCookie('superuser')   
        // window.location.href = config['basename']+"login/"
        history.push({
          pathname: '/login/',
          state: {
            data: true,
          },
        })

    },[])
    return ( <></> );
}

export default LogOutComponent;