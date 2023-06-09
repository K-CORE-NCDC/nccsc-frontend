import React from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.css";
import bgimg from '../../assets/images/bg.png';
import "../../styles/swiper_cus.css";

const Introduction = () => {

  return (
    <div className="grid grid-rows-4 gap-4 h-full w-full text-white" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover", height: `${window.innerHeight}px` }}>
      <div></div>
      <div className="row-span-2">
        <div className="grid grid-cols-6 gap-4 bg-transparent py-5 ">
          <div className="col-span-6 lg:col-span-4 py-4 mx-10 md:px-32">
            <div className="grid gap-4 ">
              <div className="text-bold text-center">
                <h1 className="text-7xl">
                  K-CORE Cancer Omics Research Portal
                </h1>
              </div>
              <div className="hidden lg:block text-center" >
                <p className=" xl:px-44 lg:px-3 md:px-16">임상 및 오믹스(유전체, 전사체, 단백질) 데이터 정보를 종합적으로 분석할 수 있는
                  분석 방법 등을 시스템으로 공유함으로써 연구 기반 조성하기 위한 서비스 입니다</p>
              </div>
            </div>
          </div>
          <div></div>

        </div>

      </div>
      <div className=" relative">
        <div className="grid lg:grid-cols-3 sm:grid-rows-3 lg:gap-16 sm:gap-2 mx-60 ">
          <div className=" sm:px-6 lg:px-0 ">
            <div className="min-w-0 flex-1">
              <div className="shadow sm:overflow-hidden sm:rounded-md ">
                <div className="bg-blue-300 px-4 py-6 sm:p-6 text-black">User Guide</div>
              </div>
            </div>
          </div>
          <div className=" sm:px-6 lg:px-0">
            <div className="min-w-0 flex-1">
              <div className="shadow sm:overflow-hidden sm:rounded-md ">
                <div className="bg-blue-300 px-4 py-6 sm:p-6 text-black">Visualize Example Data</div>
              </div>
            </div>
          </div>
          <div className="sm:px-6 sm:py-2  lg:px-0 ">
            <div className="min-w-0 flex-1">
              <div className="shadow sm:overflow-hidden sm:rounded-md  ">
                <div className="bg-blue-300 px-4 py-6 sm:p-6 text-black">Visualize My Data</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Introduction;
