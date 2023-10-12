import React, { useRef } from 'react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.css';
import bgimg from '../../assets/images/bk1.jpg';
import UserGuidePDF from '../../assets/files/DownloadbleFiles/UserGuide.pdf';
import { FormattedMessage } from 'react-intl';
import logo1 from '../../assets/images/right_below_add.png';
import logo2 from '../../assets/images/f_ci6.png';

const Introduction = ({ setActiveClassIndex, lan }) => {

  const mainDataStatusWrap = {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    bottom: '-100%',
    padding: '0 40px',
    display: 'flex',
    flexDirection: 'column',
  }

  const big_img_1 = {
    objectFit: 'scale-down',
    width: '20%',
    marginTop: '12px'
  };
  const big_img_2 = {
    objectFit: 'scale-down',
    width: '15%',
    marginTop: '12px'
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%'
      }}
      className="mainVisual"
    >
      <div className="mask">
        <div>
          <div className="visual" style={{ display: "flex", flexDirection: "columns" }}>
            <div className="txtBox main_box" data-aos="fade-in">
              <div className="txtBox_child1">
                <p className="d2">K-CORE (Cancer Omics Research) Portal</p>
                <br />
                <p className="h6" style={{ textAlign: 'center' }}>
                  {lan !== 'en-US' ? (
                    <FormattedMessage id="home_child_title" />
                  ) : (
                    <>
                      A cancer data platform that provides a variety of visualized analysis results{' '}
                      <br /> by combining high quality clinical and proteogenomic information of
                      domestic cancer patients.
                    </>
                  )}
                </p>
              </div>
              <div className="mainDataStatusWrap">
                <div className="mainDataStatus">
                  <dl style={{ background: 'transparent', columnGap: '50px' }}>
                    <dt
                      onClick={() => {
                        setActiveClassIndex(0);
                      }}
                      style={{ cursor: 'pointer' }}>
                      <a href={UserGuidePDF} download>
                        <FormattedMessage id="UserGuide" defaultMessage="User Guide" />
                      </a>
                    </dt>
                    <dt
                      onClick={() => {
                        setActiveClassIndex(2);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <FormattedMessage id="Visualization" defaultMessage="Visualize Example Data" />
                    </dt>
                    <dt
                      onClick={() => {
                        setActiveClassIndex(3);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <FormattedMessage
                        id="MyDataVisualization"
                        defaultMessage=" Visualize My Data"
                      />
                    </dt>
                  </dl>
                </div>
              </div>
            </div>
            <div className="MainPageLogos" style={mainDataStatusWrap}>
              <div >
                <img src={logo1} alt="fc1" className="logo01" style={big_img_1} />
                <img src={logo2} alt="fc1" className="logo01" style={big_img_2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Introduction;
