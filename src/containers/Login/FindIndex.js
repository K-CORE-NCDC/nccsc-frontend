import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FindID from './FindID';
import FindPassword from './FindPassword';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';

function FindIndex() {
    const route = useLocation();
    const [routeName, setRouteName] = useState(route.pathname);
    const [title, setTitle] = useState({ id: "", defaultMessage: "" })
    const listItems = [
        { id: 'FindID', defaultMessage: 'Find ID', to: '/findid/' },
        { id: 'FindPassword', defaultMessage: 'Find Password', to: '/findpassword/' },
    ];

    const breadCrumbs = {
        '/findid/': [
            { id: 'FindID', defaultMessage: 'Find ID', to: '/findid/' }
        ],
        '/findpassword/': [
            { id: 'FindPassword', defaultMessage: 'Find Password', to: '/findpassword/' },
        ],
    };

    useEffect(() => {
        setRouteName(route.pathname);
        if (route.pathname === '/findid/') {
            setTitle({ id: "FindID", defaultMessage: "Find ID" })
        } else if (route.pathname === '/findpassword/') {
            setTitle({ id: 'FindPassword', defaultMessage: 'Find Password' })
        }
    }, [route.pathname]);

    const renderContent = () => {
        if (routeName === '/findid/') {
            return <FindID />;
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
