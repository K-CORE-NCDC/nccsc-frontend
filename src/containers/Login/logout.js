import React,{useEffect} from 'react';
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