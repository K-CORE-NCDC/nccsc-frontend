import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions/api_actions';

const LogOutComponent = () => {
  const history = useHistory();

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  useEffect(() => {
    deleteCookie('is_login');
    deleteCookie('username');
    deleteCookie('superuser');
    let _ = logout('POST', {});
    history.push({
      pathname: '/login/',
      state: {
        data: true
      }
    });
  }, []);
  return <></>;
};

export default LogOutComponent;
