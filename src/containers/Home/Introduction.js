import React, { useState } from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.css";
import bgimg from '../../assets/images/bg.jpg';
// import "../../styles/swiper_cus.css";
import { FormattedMessage } from "react-intl";


const Introduction = ({ height, innerHeight }) => {
  const _height = innerHeight - height
  return (
    <div style={{ height: `${innerHeight}px`, backgroundImage: `url(${bgimg})`, backgroundSize: "cover", backgroundPosition: "50% 50%" }} className="mainVisual">
      <div className="mask">
        <div className="visual">
          <div className="txtBox main_box" data-aos="fade-in" >
            <div className="txtBox_child1">
              <p className="d2" >KCore Cancer Omics<br /> Research Portal</p>
              <br />
              <p className="h6">
                <FormattedMessage
                  id="home_child_title"
                  defaultMessage="A cancer data platform that provides a variety of visualized analysis results by combining high quality clinical and proteogenomic information of domestic cancer patients."
                />
              </p>
            </div>
            <div className="txtBox_child2">
              <a href='#test' className="btn btnPrimary btnSearch" style={{ width: '100%' }}>Login</a>
              <span style={{ justifyContent: 'center', display: 'flex', color: '#003177', paddingTop:'8px' }}>
                <a href="#" >Create registration number</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#">Find Password</a>
              </span>
              {/* <div className="titleBox titleBox02">
                <div className="con con01 colorSecondary">
                  <span>Login</span>
                </div> */}

              {/* </div> */}
            </div>
            <div className="mainDataStatusWrap">
              <div className="mainDataStatus" >
                <dl style={{ 'background': 'transparent', columnGap: '50px', }}>
                  <dt>
                    User Guide
                  </dt>
                  <dt >
                    Visualize Example Data
                  </dt>
                  <dt>
                    Visualize My Data
                  </dt>
                </dl>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  )
}
export default Introduction;
