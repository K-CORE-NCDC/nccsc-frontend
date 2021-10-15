import tit_bar2 from '../../assets/images/sub/tit_bar2.gif'
import React, { useState } from "react";
import s1 from '../../assets/images/business_tab3.png'


export default function Introduce() {
  const [tabs, setTabs] = useState(1);

    return(
        <section class="intro_wrap">
          <h1>헬스케어 빅데이터 쇼케이스 구축사업</h1>
          <ul className="intro_tab">
              <li className={tabs === 1?"on":"" }><a onClick={()=>setTabs(1)}>사업 소개</a></li>
              <li className={tabs === 2?"on":"" }><a onClick={()=>setTabs(2)}>암단백유전체사업단 소개</a></li>
              <li className={tabs === 3?"on":"" }><a onClick={()=>setTabs(3)}>보유 데이터 소개</a></li>
          </ul>

          <ul className="at">
            <li className={tabs === 1?"at1 on":"at1"}>
              <div class="grid grid-cols-2 gap-2">
                  <div className="imgbox"><img src="" alt=""/></div>
                  <div className="txtbox">
                    <h3>헬스케어 빅데이터 쇼케이스 구축사업은</h3>
                    <p>대통령 직속 4차산업 혁명위원회 <br/>
                            '4차 산업 혁명 기반 헬스케어 발전전략'에 따라 <br/>
                            헬스케어 6대 프로젝트 추직 전략 중 하나로써 <br/>
                            국립암센터 암빅데이터에서 수행중인 사업입니다.</p>
                  </div>
              </div>
            </li>

            <li className={tabs === 2?"at2 on":"at2"}>
                <div class="grid grid-cols-2 gap-2">
                  <div className="imgbox" id="business_imgbox_2"><img src="" alt=""/></div>
                  <div className="txtbox">
                      <h3>암단백유전체사업단은</h3>
                      <p>암 단백유전체 분석을 통해 암의 새로운 바이오마커를 발굴하고<br/>
                              이를 기반으로하는 신 치료 기술 개발의 근거를 제공하고자<br/>
                              국립암센터에 구성된 연구사업단입니다.<br/>
                      </p>
                  </div>
                </div>
            </li>

            <li className={tabs === 3?"at3 on":"at3"}>
                <div className="imgbox12"><img src={s1} alt=""/></div>
            </li>
        </ul>
        </section>
    )
}
