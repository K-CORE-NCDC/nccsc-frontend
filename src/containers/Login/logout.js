import React from 'react';
import config from '../../config'
const LogOutComponent = () => {
    localStorage.removeItem('ncc_access_token');
    localStorage.removeItem('ncc_refresh_token');
    // window.location.href = "/core/home"
    window.location.href = config['basename']+"login/"
    
    return ( <></> );
}

export default LogOutComponent;