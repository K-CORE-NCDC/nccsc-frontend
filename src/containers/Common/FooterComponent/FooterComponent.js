import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import footer_img from "../../../assets/images/f_logo.png";

const FooterComponent = () => {
  const [isFooter, setFooter] = useState(true)
 
  return (

    <>
      {isFooter &&
        <footer id="footer" className="swiper-slide footer" >
          <div className="footerMiddle ">
            <div className="footerMiddle_data Flex" style={{ marginLeft: '3%' }}>
              <Link to="/k-core/termsandconditions/">
                <span >
                  Member Terms and Conditions
                </span>
              </Link>
              <p style={{ paddingLeft: '25px' }}> | </p>
              <Link to="/k-core/privacypolicy/">
                <span style={{ paddingLeft: '25px' }}>
                  Privacy Policy
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
              <img src={footer_img} alt="footer_img"></img>
            </div>
          </div>
        </footer >}
    </>




  )

}
export default FooterComponent;