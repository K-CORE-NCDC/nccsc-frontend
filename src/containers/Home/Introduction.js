import React, { useRef } from 'react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.css';
import bgimg from '../../assets/images/bk1.jpg';
import UserGuidePDF from '../../assets/files/DownloadbleFiles/UserGuide.pdf';
import { FormattedMessage } from 'react-intl';
import logo1 from '../../assets/images/introimg1 (2).png';
import logo2 from '../../assets/images/introImg2 (2).png';

const Introduction = ({ setActiveClassIndex, lan }) => {
  const img_div = {
    display: "flex",
    justifyContent: "flex-end",
    // marginTop: "-20px",
    gap: "20px",
    marginRight: '1%',
  };
  const big_img1 = {
    objectFit: 'scale-down',
    width: '15%',
    marginTop: '10px'
  };
  const big_img2 = {
    objectFit: 'scale-down',
    width: '10%',
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
          <div className="visual logo_visual" style={{ display: "flex", flexDirection: "columns" }}>
            <div className="txtBox main_box" data-aos="fade-in">
              <div className="txtBox_child1">
                <p className="d2">K-CORE (Cancer Omics Research) Portal</p>
                <br />
                <p className="h6" style={{ textAlign: 'center' }}>
                  {lan !== 'en-US' ? (
                    <FormattedMessage id="home_child_title" />
                  ) : (
                    <>
                      The data platform integrates clinical data and proteogenomic information from cancer patients to visually display various analysis results.
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
                      tabIndex={0}
                      onClick={() => {
                        setActiveClassIndex(2);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveClassIndex(2);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <FormattedMessage id="Visualization" defaultMessage="Visualize Example Data" />
                    </dt>
                    <dt
                      tabIndex={0}
                      onClick={() => {
                        setActiveClassIndex(3);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveClassIndex(3);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <FormattedMessage
                        id="VisualizeMyData"
                        defaultMessage="Visualize My Data"
                      />
                    </dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div style={img_div} className='img_div'>
            <img src={logo1} alt="ncdc_logo_white" className="logo01" style={big_img1} />
            <img src={logo2} alt="ncc_logo_white" className="logo01" style={big_img2} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Introduction;
