import React, { useEffect, useState } from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.css";
import bgimg from '../../assets/images/bk1.jpg';
// import "../../styles/swiper_cus.css";
import { FormattedMessage } from "react-intl";


const Introduction = ({ height, innerHeight, setActiveClassIndex, lan }) => {
  const _height = innerHeight - height
  return (
    <div style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover", backgroundPosition: "50% 50%" }} className="mainVisual">
      <div className="mask">
        <div className="visual">
          <div className="txtBox main_box" data-aos="fade-in" >
            <div className="txtBox_child1">
              <p className="d2" >K-Core Cancer Omics Research Portal</p>
              <br />
              <p className="h6" style={{ textAlign: 'center' }}>
                {lan !== 'en-US' ?
                  <FormattedMessage
                    id="home_child_title"
                  /> :
                  <>
                    A cancer data platform that provides a variety of visualized analysis results <br /> by combining high quality clinical and proteogenomic information of domestic cancer patients.F
                  </>}
              </p>
            </div>
            <div className="mainDataStatusWrap">
              <div className="mainDataStatus" >
                <dl style={{ 'background': 'transparent', columnGap: '50px', }}>
                  <dt>
                    <FormattedMessage id="UserGuide" defaultMessage='User Guide' />
                  </dt>
                  <dt onClick={() => {
                    setActiveClassIndex(2)
                  }} style={{ cursor: 'pointer' }}>
                    <FormattedMessage id="Visualization" defaultMessage='Visualize Example Data' />
                  </dt>
                  <dt onClick={() => {
                    setActiveClassIndex(3)
                  }} style={{ cursor: 'pointer' }}>
                    <FormattedMessage id="MyDataVisualization" defaultMessage=' Visualize My Data' />
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
