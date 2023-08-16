import React from "react";
import { ChartPieIcon, ChevronDownIcon, FingerPrintIcon, MenuIcon, PhoneIcon, PlusIcon, XCircleIcon } from '@heroicons/react/outline';
import fig_01 from '../../assets/images/f_ci1.png'
import fig_02 from '../../assets/images/organization-img02.svg'
import fig_03 from '../../assets/images/organization-img03.svg'
import fig_04 from '../../assets/images/organization-img04.svg'
import fig_05 from '../../assets/images/organization-img05.svg'
import fig_06 from '../../assets/images/organization-img06.svg'
import fig_07 from '../../assets/images/organization-img07.svg'
import fig_08 from '../../assets/images/organization-img08.svg'
import fig from '../../assets/images/Organi_korean.png'
import fig2 from '../../assets/images/Organi_english.png'


const Organization = ({ lan }) => {

  var scrollDiv = document?.getElementById("ptn")?.offsetTop;
  window.scrollTo({ top: scrollDiv, behavior: 'smooth' });

  const handleScroll = (event) => {
    // console.log(event)
    // var topPos = document.getElementById('parent').offsetTop;
    // event.scrollTop = topPos-10;
    // // document.getElementById('ptnO').scrollTop = 150;
    if (event?.deltaY > 0) {
      document.getElementById('ptnO').scrollTop += 10;
      // this.decreaseValue()
    } else {
      document.getElementById('ptnO').scrollTop -= 10;
      // this.increaseValue()
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