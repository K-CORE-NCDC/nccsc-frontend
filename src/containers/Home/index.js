import React, { useEffect, useState, useContext } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { Context } from "../../wrapper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s1 from "../../assets/images/f_ci1.png";
import s2 from "../../assets/images/f_ci2.png";
import s3 from "../../assets/images/f_ci3.png";
import s4 from "../../assets/images/f_ci4.png";
import s5 from "../../assets/images/f_ci5.png";
import s6 from "../../assets/images/f_ci6.png";
import s7 from "../../assets/images/f_ci7.png";
import breast_cancer_english from "../../assets/images/breast_cancer_english.png";
import breast_cancer_korean from "../../assets/images/breast_cancer_korean.png";
import s8 from "../../assets/images/right_below_add.png";
import { FormattedMessage } from "react-intl";

import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const dispatch = useDispatch();
  const countJson = useSelector((data) => data.homeReducer.dataCount);

  useEffect(() => {
    let today = new Date();
    var date =
      today.getFullYear() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getDate();
    var a_or_p = today
      .toLocaleString("en-US", { hour: "numeric", hour12: true })
      .split(" ")[1];
    var time = a_or_p + " " + today.getHours() + ":" + (today.getMinutes() <=9 ? `0${today.getMinutes()}`: today.getMinutes());
 

    setCurrentDate(date);
    setCurrentTime(time);
  }, []);

  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const context = useContext(Context);
  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  },[context]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
  };
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="bg-white 2xl:hidden">
          <div className="grid grid-cols-5 p-14 border-b border-blue">
            <div className="text-right sm:text-3xl xs:text-xl sm:col-start-1 lg:text-5xl lg:col-start-2">
              Today
            </div>
            <div className="text-left sm:text-4xl xs:text-xl lg:text-6xl px-10 lg:col-span-3 sm:col-span-4">
              <p>
                {currentDate ? currentDate : ""}
                <br />
                <br />
                {currentTime ? currentTime : ""}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="border-r border-blue ">
              <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                <FormattedMessage
                  id="Primary_Sites"
                  defaultMessage="Primary Sites"
                />
                <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
              </div>
              <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                <FormattedMessage id="Sample" defaultMessage="Sample" />
                <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
              </div>
              <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                <FormattedMessage id="Genes" defaultMessage="Genes" />
                <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
              </div>
              <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                <FormattedMessage id="Mutations" defaultMessage="Mutations" />
                <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
              </div>
              <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                <FormattedMessage id="cnv" defaultMessage="CNV" />
                <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
              </div>
              <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                <FormattedMessage
                  id="Fusion Genes"
                  defaultMessage="Fusion Genes"
                />
                <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
              </div>
              <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                <FormattedMessage
                  id="Global Proteome"
                  defaultMessage="Global Proteome"
                />
                <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
              </div>
              <div className="p-20 lg:text-3xl sm:text-2xl xs:text-sm text-right">
                <FormattedMessage
                  id="Phospho Site"
                  defaultMessage="Phospho Site"
                />
                <ChevronRightIcon className="h-5 w-5 text-main-blue inline-flex" />
              </div>
            </div>
            <div>
              <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                1
              </div>
              <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                {countJson && "sample" in countJson ? countJson["sample"] : ""}
              </div>
              <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                {countJson && "genes" in countJson ? countJson["genes"] : ""}
              </div>
              <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                {countJson && "mutation" in countJson
                  ? countJson["mutation"]
                  : ""}
              </div>
              <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                {countJson && "cnv" in countJson ? countJson["cnv"] : ""}
              </div>
              <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                {countJson && "fusion" in countJson ? countJson["fusion"] : ""}
              </div>
              <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                {countJson && "proteome" in countJson
                  ? countJson["proteome"]
                  : ""}
              </div>
              <div className="p-20  pl-24 lg:text-3xl sm:text-2xl xs:text-sm text-left">
                {countJson && "phospho" in countJson
                  ? countJson["phospho"]
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-main-blue p-14 2xl:p-5  2xl:col-span-2">
          <div className="grid h-72 2xl:grid-cols-12">
            <div className="text-white grid text-center mb-16 content-center text-3xl 2xl:col-span-2">
              <FormattedMessage
                id="Data of included cancer type"
                defaultMessage="Data of included cancer type"
              />
              <br />
              <FormattedMessage
                id="Table relationship"
                defaultMessage="[Table relationship]"
              />
            </div>
            <div className=" con 2xl:col-span-10">
              <ul className="grid lg:grid-cols-3 2xl:grid-cols-10">
                <li className="text-center pt-1  relative">
                  <a>
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full"
                    >
                      <span></span>
                      <font className="text-white text-3xl text-3xl ">
                        <FormattedMessage
                          id="breast cancer"
                          defaultMessage="Breast cancer"
                        />
                      </font>
                    </button>
                  </a>
                </li>
                <li className="text-center pt-1 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">
                      <FormattedMessage
                        id="Thyroid cancer"
                        defaultMessage="Thyroid cancer"
                      />
                    </font>
                  </a>
                </li>
                <li className="text-center pt-1 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">
                      <FormattedMessage
                        id="Cervical cancer"
                        defaultMessage="Cervical cancer"
                      />
                    </font>
                  </a>
                </li>
                <li className="text-center pt-1 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl">
                      <FormattedMessage
                        id="lung cancer"
                        defaultMessage="lung cancer"
                      />
                    </font>
                  </a>
                </li>
                <li className="text-center pt-1  relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">
                      <FormattedMessage
                        id="Colorectal cancer"
                        defaultMessage="Colorectal cancer"
                      />
                    </font>
                  </a>
                </li>
                <li className="text-center pt-1 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">
                      <FormattedMessage
                        id="renal cancer"
                        defaultMessage="Renal cancer"
                      />
                    </font>
                  </a>
                </li>
                <li className="text-center pt-1 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl ">
                      <FormattedMessage
                        id="Liver cancer"
                        defaultMessage="Liver cancer"
                      />
                    </font>
                  </a>
                </li>
                <li className="text-center pt-1 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">
                      <FormattedMessage
                        id="cancer of the stomach"
                        defaultMessage="Cancer of the stomach"
                      />
                    </font>
                  </a>
                </li>
                <li className="text-center pt-1 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">
                      <FormattedMessage
                        id="Prostate cancer"
                        defaultMessage="Prostate cancer"
                      />
                    </font>
                  </a>
                </li>
                <li className="text-center pt-1 relative">
                  <a>
                    <span></span>
                    <font className="text-white text-3xl text-center">
                      <FormattedMessage
                        id="Pancreatic cancer"
                        defaultMessage="Pancreatic cancer"
                      />
                    </font>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white lg:pt-0  pt-20">
        <div className="py-10 border-t ">
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
            <div>
              <img src={s8} width="250" />
            </div>
          </Slider>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div className="relative w-auto my-6 mx-auto container md-container">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div>
                  {koreanlanguage && (
                    <div className="relative p-6 flex-auto">
                        <img src={breast_cancer_korean} />
                    </div>
                  )}
                  {Englishlanguage && (
                    <div className="relative p-6 flex-auto">
                      <img src={breast_cancer_english} />
                    </div>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <FormattedMessage id="Close" defaultMessage="Close" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
