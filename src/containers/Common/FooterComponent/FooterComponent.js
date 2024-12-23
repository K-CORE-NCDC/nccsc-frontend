import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo1 from '../../../assets/images/right_below_add.png';
import logo2 from '../../../assets/images/FooterFinal.png';

const FooterComponent = () => {
  const img_div = {
    display: "flex",
    justifyContent: "flex-end",
    width: "60%",
    marginTop: "-20px",
    gap: "20px"

  };
  const big_img1 = {
    objectFit: 'scale-down',
    width: '20%',
    marginTop: '12px'
  };
  const big_img2 = {
    objectFit: 'scale-down',
    width: '15%',
    marginTop: '12px'
  };

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
            {/* <p style={{ paddingLeft: '25px' }}> | </p>
            <Link to="/privacypolicy/">
              <span style={{ paddingLeft: '25px' }}>
                <FormattedMessage id="PrivacyPolicy" defaultMessage="Privacy Policy" />
              </span>
            </Link> */}
          </div>
        </div>
        <div className="footerBottom">
          <div>
            <p>경기도 고양시 일산동구 일산로 323 국립암센터</p>
            <p>Copyright ⓒ 2021 by NCC. All rights reserved.</p>
          </div>
          <div style={img_div} className='footer_img_div'>
            <img src={logo1} alt="ncdc_logo_white" className="logo01 mobile_logo" style={big_img1} />
            <img src={logo2} alt="ncc_logo_white" className="logo01 mobile_logo" style={big_img2} />
          </div>
        </div>
      </footer>
    </>
  );
};
export default FooterComponent;
