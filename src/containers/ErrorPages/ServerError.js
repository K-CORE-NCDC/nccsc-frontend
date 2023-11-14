import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import serverErrorIMage from '../../assets/images/ServerError.jpg';

function ServerError() {
    const routeLocation = useLocation();
    const history = useHistory();
    const title = { id: 'serverError', defaultMessage: 'Server Error' };

    const breadCrumbs = {
        '/server-error/': [{ id: 'serverError', defaultMessage: 'Server Error', to: '/server-error/' }]
    };

    const handleGoBack = () => {
        history.goBack();
    };

    const big_img1 = {
        objectFit: 'scale-down',
        width: '50%',
        margin: '0 auto'
    };

    return (
        <>
            <HeaderComponent title={title} breadCrumbs={breadCrumbs['/server-error/']} type="single" />

            <article id="subContents" className="subContents">
                <div>
                    <div className="ptn">
                        <div className="auto">
                            {routeLocation.pathname !== '/' ? (
                                <div className="serverError">
                                    <img src={serverErrorIMage} alt="fc1" className="logo01" style={big_img1} />
                                    <div className="bottomBtns MarginTop4">
                                        <div className="flex">

                                            <button
                                                type="button"
                                                className="btn btnPrimary"
                                                id="LoginButton"
                                                onClick={handleGoBack}
                                            >
                                                <font style={{ verticalAlign: 'inherit' }}>
                                                    <font style={{ verticalAlign: 'inherit' }}>
                                                        <FormattedMessage id="Back" defaultMessage="Go Back" />
                                                    </font>
                                                </font>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}

export default ServerError;
