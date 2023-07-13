import React, { useState } from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.css";
import bgimg from '../../assets/images/bg.jpg';
// import "../../styles/swiper_cus.css";
import { FormattedMessage } from "react-intl";


const Introduction = ({ height, innerHeight }) => {
  const _height = innerHeight - height
  return (
    <div style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover", backgroundPosition: "50% 50%" }} className="mainVisual">
      <div className="mask">
        <div className="visual">
          <div className="txtBox main_box" data-aos="fade-in" >
            <div className="txtBox_child1">
              <p className="d2" >K-Core Cancer Omics Research Portal</p>
              <br />
              <p className="h6">
                <FormattedMessage
                  id="home_child_title"
                  defaultMessage="A cancer data platform that provides a variety of visualized analysis results by combining high quality clinical and proteogenomic information of domestic cancer patients."
                />
              </p>
            </div>
            {/* <div className="txtBox_child2">
              <a href='#test' className="btn btnPrimary btnSearch" style={{ width: '100%' }}>
              <FormattedMessage id="Login" defaultMessage='Login' />
              </a>
              <span style={{ justifyContent: 'center', display: 'flex', color: '#003177', paddingTop:'8px' }}>
                <a href="#" >Create registration number</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#">Find Password</a>
              </span>
            </div> */}
            {/* <div className="txtBox " data-aos="fade-in">
              <p className="d2" >KCore Cancer Omics Research Portal</p>
              <br />
              <p className="h6">
                <FormattedMessage
                  id="home_child_title"
                  defaultMessage="A cancer data platform that provides a variety of visualized analysis results by  combining high quality clinical and proteogenomic information of domestic cancer patients."
                />
              </p>
            </div> */}
            <div className="mainDataStatusWrap">
              <div className="mainDataStatus" >
                <dl style={{ 'background': 'transparent', columnGap: '50px', }}>
                  <dt>
                  <FormattedMessage id="UserGuide" defaultMessage='User Guide' />
                  </dt>
                  <dt >
                  <FormattedMessage id="Visualization" defaultMessage='Visualize Example Data' />
                  </dt>
                  <dt>
                  <FormattedMessage id="MyDataVisualization" defaultMessage=' Visualize My Data'/>
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
