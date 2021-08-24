import React from 'react';
import { useHistory } from "react-router-dom";

const LogOutComponent = () => {
    let history = useHistory();
    localStorage.removeItem('ncc_access_token');
    localStorage.removeItem('ncc_refresh_token');
    history.push("/")
    
    return ( <></> );
}

export default LogOutComponent;