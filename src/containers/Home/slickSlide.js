import React from 'react';
import Slider from 'react-slick';
import f_ci1 from '../../assets/images/f_ci1.png';
import f_ci2 from '../../assets/images/f_ci2.png';
import f_ci3 from '../../assets/images/f_ci3.png';
import f_ci4 from '../../assets/images/f_ci4.png';
import f_ci5 from '../../assets/images/f_ci5.png';
import f_ci6 from '../../assets/images/f_ci6.png';
import f_ci7 from '../../assets/images/f_ci7.png';
import f_ci8 from '../../assets/images/right_below_add.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SlickSlider() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0
  };
  const img = {
    objectFit: 'scale-down',
    width: '100%'
  };
  const big_img1 = {
    objectFit: 'scale-down',
    width: '73%',
    marginTop:'12px'
  };
  const big_img2 = {
    objectFit: 'scale-down',
    width: '73%',
    marginTop:'15px'
  };
  return (
    <div className="P5 Border BorderTop1 BorderGray200" style={{ borderStyle: 'solid' }}>
      <Slider {...settings}>
        <div>
          <img src={f_ci1} alt="mohw_logo" style={img} />
        </div>
        <div>
          <img src={f_ci2} alt="msit_logo" style={img} />
        </div>
        <div>
          <img src={f_ci3} alt="motie_logo" style={img} />
        </div>
        <div>
          <img src={f_ci4} alt="khis_logo" style={img} />
        </div>
        <div>
          <img src={f_ci5} alt="khidi_logo" style={img} />
        </div>
        <div>
          <img src={f_ci6} alt="ncc_logo" style={img} />
        </div>
        <div>
          <img src={f_ci7} alt="cbpc_logo" style={big_img1} />
        </div>
        <div>
          <img src={f_ci8} alt="ncdc_logo" style={big_img2} />
        </div>
      </Slider>
    </div>
  );
}
