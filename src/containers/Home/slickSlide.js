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
  return (
    <div className="P5 Border BorderTop1 BorderGray200" style={{ borderStyle: 'solid' }}>
      <Slider {...settings}>
        <div>
          <img src={f_ci1} alt="fc1" style={img} />
        </div>
        <div>
          <img src={f_ci2} alt="fc2" style={img} />
        </div>
        <div>
          <img src={f_ci3} alt="fc3" style={img} />
        </div>
        <div>
          <img src={f_ci4} alt="fc4" style={img} />
        </div>
        <div>
          <img src={f_ci5} alt="fc5" style={img} />
        </div>
        <div>
          <img src={f_ci6} alt="fc6" style={img} />
        </div>
        <div>
          <img src={f_ci7} alt="fc7" style={img} />
        </div>
        <div>
          <img src={f_ci8} alt="fc8" style={img} />
        </div>
      </Slider>
    </div>
  );
}
