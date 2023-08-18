import React from "react";
import fig from '../../assets/images/Organi_korean.png'
import fig2 from '../../assets/images/Organi_english.png'


const Organization = ({ lan }) => {

  var scrollDiv = document?.getElementById("ptn")?.offsetTop;
  window.scrollTo({ top: scrollDiv, behavior: 'smooth' });

  const handleScroll = (event) => {
    if (event?.deltaY > 0) {
      document.getElementById('ptnO').scrollTop += 10;
    } else {
      document.getElementById('ptnO').scrollTop -= 10;
    }
  }
  const preventDefault = (e) => {
    e = e || window.event
    if (e.preventDefault) {
      e.preventDefault()
    }
    e.returnValue = false
  }
  const disableScroll = () => {
    document.addEventListener('wheel', preventDefault, {
      passive: false,
    })
  }

  const enableScroll = () => {
    document.removeEventListener('wheel', preventDefault, false)
  }

  return (

    <div className="auto">
      <div className="publicDataInfo center" align="center">
        {lan === 'kr-KO' ?
          <img src={fig} alt="" style={{ height: '590px' }} /> :
          <img src={fig2} alt="" style={{ height: '590px' }} />
        }

      </div>
    </div>
  )

}
export default Organization;