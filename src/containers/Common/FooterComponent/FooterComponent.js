import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import mainLogo from '../../../assets/images/mainLogo.png';

const FooterComponent = () => {

  return (
    <>
      <footer id="footer" className="swiper-slide footer">
        <div className="footerMiddle ">
          <div className="footerMiddle_data Flex" style={{ marginLeft: '3%' }}>
            <Link to="/termsandconditions/">
              <span>
                <FormattedMessage
                  id="TermsofService"
                  defaultMessage="Member Terms and Conditions"
                />
              </span>
            </Link>
            <p style={{ paddingLeft: '25px' }}> | </p>
            <Link to="/privacypolicy/">
              <span style={{ paddingLeft: '25px' }}>
                <FormattedMessage id="PrivacyPolicy" defaultMessage="Privacy Policy" />
              </span>
            </Link>
          </div>
        </div>
        <div className="footerBottom">
          <div>
            <p>경기도 고양시 일산동구 일산로 323 국립암센터</p>
            <p>Copyright ⓒ 2021 by NCC. All rights reserved.</p>
          </div>
          <div>
            <img src={mainLogo} alt="footer_img" className="logo01" style={{width:'150px'}}></img>
          </div>
        </div>
      </footer>
    </>
  );
};
export default FooterComponent;
