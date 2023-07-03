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


const Organization = () => {
  return (
    <div className="contentsTitle">
      <div className=" ptn">
        <div className="auto">
          <div className="organization" style={{overflowY:'scroll',height:'70vh'}}>
            <div className="conBox conBox01">
              <div className="cellBox">
                <img src={fig_01} alt="" />

              </div>
            </div>
            <div className="conBox conBox02">
              <div className="cellBox">
                <img src={fig_02} alt="" />
                암데이터 관리 <br className="m" />전문 위원회
              </div>
            </div>
            <div className="conBox conBox03">
              <div className="cellBox">
                <img src={fig_03} alt="" />
                <span className="division"></span>
                <img src={fig_04} alt="" />
              </div>
            </div>
            <div className="conBox conBox04">
              <ul>
                <li>
                  <dl>
                    <dt>
                      <div className="dots">
                        <span className="dot01"></span>
                        <span className="dot02"></span>
                        <span className="dot03"></span>
                        <span className="dot04"></span>
                      </div>
                      <img src={fig_05} alt="" />  데이터 구축팀
                    </dt>
                    <dd>
                      <p>데이터 구축 계획 수립</p>
                      <p>데이터 수집 및 구축</p>
                      <p>데이터 자원 조사 및 연구, 개발</p>
                      <p>데이터 비식별 및 가명화 연구 개발</p>
                      <p>암데이터 표준화 및 비정형데이터 처리 관련 연구 개발</p>
                      <p>기타 암데이터 구축 업무관련 사항</p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>
                      <div className="dots">
                        <span className="dot01"></span>
                        <span className="dot02"></span>
                        <span className="dot03"></span>
                        <span className="dot04"></span>
                      </div>
                      <img src={fig_06} alt="" />  데이터 운영팀
                    </dt>
                    <dd>
                      <p>데이터 보안 및 품질관리</p>
                      <p>정보화사업기획</p>
                      <p>HW/SW관리</p>
                      <p>DB/서버관리</p>
                      <p>플랫폼운영관리</p>
                      <p>시스템유지보수</p>
                      <p>폐쇄환경시스템</p>
                      <p>연구자계정관리</p>
                      <p>보안체계마련</p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>
                      <div className="dots">
                        <span className="dot01"></span>
                        <span className="dot02"></span>
                        <span className="dot03"></span>
                        <span className="dot04"></span>
                      </div>
                      <img src={fig_07} alt="" />  데이터 결합팀
                    </dt>
                    <dd>
                      <p>결합전문기관으로 결합서비스</p>
                      <p>결합키 관리</p>
                      <p>결합신청 접수</p>
                      <p>가명처리</p>
                      <p>가명처리 적정성 평가</p>
                      <p>결합시스템 운영</p>
                      <p>결합을 위한 정책 및 절차수립</p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>
                      <div className="dots">
                        <span className="dot01"></span>
                        <span className="dot02"></span>
                        <span className="dot03"></span>
                        <span className="dot04"></span>
                      </div>
                      <img src={fig_08} alt="" />  데이터 활용팀
                    </dt>
                    <dd>
                      <p>데이터활용지원</p>
                      <p>데이터 신청서류검토, 심의</p>
                      <p>심의결과 통보</p>
                      <p>포털운영관리</p>
                      <p>서비스문의 상담</p>
                      <p>연구성과관리</p>
                      <p>결과반출관리</p>
                      <p>민원처리</p>
                      <p>임상역학분석지원</p>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>

    </div>

  )

}
export default Organization;