import React from 'react';
import fig2 from '../../assets/images/Organi_english.png';
import fig from '../../assets/images/Organi_korean.png';

const Organization = ({ lan }) => {
  var scrollDiv = document?.getElementById('ptn')?.offsetTop;
  window.scrollTo({ top: scrollDiv, behavior: 'smooth' });



  return (
    <div className="auto">
      <div className="publicDataInfo center" align="center">
        {lan === 'kr-KO' ? (
          <img src={fig} alt="" style={{ height: '590px' }} />
        ) : (
          <img src={fig2} alt="" style={{ height: '590px' }} />
        )}
      </div>
    </div>
  );
};
export default Organization;
