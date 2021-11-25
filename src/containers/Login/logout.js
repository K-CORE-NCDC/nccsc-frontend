import React from 'react';

const LogOutComponent = () => {
    localStorage.removeItem('ncc_access_token');
    localStorage.removeItem('ncc_refresh_token');
    window.location.href = "/core/home"
    
    return ( <></> );
}

export default LogOutComponent;