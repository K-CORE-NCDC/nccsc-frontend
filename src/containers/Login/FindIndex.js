import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FindRegistrationNumber from './FindRegistrationNumber';
import FindPassword from './FindPassword';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';

function FindIndex() {
  const route = useLocation();
  const [routeName, setRouteName] = useState(route.pathname);
  const [title, setTitle] = useState({ id: '', defaultMessage: '' });
  const listItems = [
    { id: 'FindRegistrationNumber', defaultMessage: 'Find Registration Number', to: '/findregistrationnumber/' },
    { id: 'FindPassword', defaultMessage: 'Find Password', to: '/findpassword/' }
  ];

  const breadCrumbs = {
    '/findregistrationnumber/': [{ id: 'FindRegistrationNumber', defaultMessage: 'Find Registration Number', to: '/findregistrationnumber/' }],
    '/findpassword/': [
      { id: 'FindPassword', defaultMessage: 'Find Password', to: '/findpassword/' }
    ]
  };

  useEffect(() => {
    setRouteName(route.pathname);
    if (route.pathname === '/findregistrationnumber/') {
      setTitle({ id: 'Find ID: K-Core', defaultMessage: 'Find Registration Number' });
    } else if (route.pathname === '/findpassword/') {
      setTitle({ id: 'Find PW: K-Core', defaultMessage: 'Find Password' });
    }
  }, [route.pathname]);

  const renderContent = () => {
    if (routeName === '/findregistrationnumber/') {
      return <FindRegistrationNumber />;
    } else if (routeName === '/findpassword/') {
      return <FindPassword />;
    }
    return null;
  };

  return (
    <>
      <HeaderComponent
        title={title}
        routeName={routeName}
        breadCrumbs={breadCrumbs[routeName]}
        type="multiple"
        listItems={listItems}
      />
      <article id="subContents" className="subContents">
        {renderContent()}
      </article>
    </>
  );
}

export default FindIndex;
