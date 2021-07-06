import banner_img from '../../assets/img/top_banner01.png'
import {ChevronRightIcon} from '@heroicons/react/outline'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s1 from '../../assets/images/f_ci1.png'
import s2 from '../../assets/images/f_ci2.png'
import s3 from '../../assets/images/f_ci3.png'
import s4 from '../../assets/images/f_ci4.png'
import s5 from '../../assets/images/f_ci5.png'
import s6 from '../../assets/images/f_ci6.png'
import s7 from '../../assets/images/f_ci7.png'

export default function Home() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
  }
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className='bg-white 2xl:hidden'>
          <div className="grid grid-cols-5 p-14 border-b border-blue">
            <div className='text-right text-5xl col-start-2'>
              Today
            </div>
            <div className='text-left text-6xl px-10 col-span-3'>
              <p><strong>2021.04.26.</strong><br/><br/>
              PM 15:20</p>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="border-r border-blue ">
              <div className="p-20 text-3xl text-right">암종 (Primary Sites)<ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/></div>
              <div className="p-20 text-3xl text-right">전체대상자 (Sample)<ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/></div>
              <div className="p-20 text-3xl text-right">유전자 (Genes)<ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/></div>
              <div className="p-20 text-3xl text-right">돌연변이 (Mutations)<ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/></div>
              <div className="p-20 text-3xl text-right">유전체 복제수변이 (CNV)<ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/></div>
              <div className="p-20 text-3xl text-right">융합 유전자 (Fusion Genes)<ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/></div>
              <div className="p-20 text-3xl text-right">Global Proteome<ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/></div>
              <div className="p-20 text-3xl text-right">Phospho Site<ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex"/></div>
            </div>
            <div>
              <div className="p-20  pl-24 text-3xl text-left">1</div>
              <div className="p-20  pl-24 text-3xl text-left">45312</div>
              <div className="p-20  pl-24 text-3xl text-left">1</div>
              <div className="p-20  pl-24 text-3xl text-left">1265</div>
              <div className="p-20  pl-24 text-3xl text-left">1</div>
              <div className="p-20  pl-24 text-3xl text-left">9865</div>
              <div className="p-20  pl-24 text-3xl text-left">1</div>
              <div className="p-20  pl-24 text-3xl text-left">1</div>
            </div>
          </div>
        </div>
        <div className='bg-main-blue p-14 2xl:p-5  2xl:col-span-2'>
          <div className='grid 2xl:grid-cols-12'>
            <div className="text-white grid text-center content-center text-3xl 2xl:col-span-2">
              보유 암종별 데이터<br/>
              [테이블 관계도]
            </div>
            <div className=" con 2xl:col-span-10">
              <ul className='grid lg:grid-cols-3 2xl:grid-cols-10'>
                <li className="text-center py-10 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-3xl ">breast cancer</font>
                  </a>
                </li>
                <li className="text-center py-10 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">thyroid cancer</font>
                  </a>
                </li>
                <li className="text-center py-10 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">uterine cancer</font>
                  </a>
                </li>
                <li className="text-center py-10 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl ">lung cancer</font>
                  </a>
                </li>
                <li className="text-center py-10 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">colorectal cancer</font>
                  </a>
                </li>
                <li className="text-center py-10 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">kidney cancer</font>
                  </a>
                </li>
                <li className="text-center py-10 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl ">liver cancer</font>
                  </a>
                </li>
                <li className="text-center py-10 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">stomach cancer</font>
                  </a>
                </li>
                <li className="text-center py-10 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">prostate cancer</font>
                  </a>
                </li>
                <li className="text-center py-10 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">pancreateic biliary cancer</font>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="p-1 lg:pt-0 pt-20">
        <div className='p-10 border-t border-b'>
          <Slider {...settings}>
            <div>
              <img src={s1} />
            </div>
            <div>
              <img src={s2} />
            </div>
            <div>
              <img src={s3} />
            </div>
            <div>
              <img src={s4} />
            </div>
            <div>
              <img src={s5} />
            </div>
            <div>
              <img src={s6} />
            </div>
            <div>
              <img src={s7} />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}
