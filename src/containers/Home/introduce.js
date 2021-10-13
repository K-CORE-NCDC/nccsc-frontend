import tit_bar2 from '../../assets/images/sub/tit_bar2.gif'
export default function Introduce() {
    return(
        <div className="sub1_wrap">
            <h3 className="intro_tit leading-tight">
                <img alt="tit-bar" src={tit_bar2}/>
                <div className="intro_tit_sub">암 정밀 의료를 실현하기 위한</div>
                암환자 다차원 연계 데이터 활용 시스템 고도화 필요
            </h3>
            <ul className="circle_wrap">
                <li className="circle">암 정밀의료의 <br/>실현</li>
                <div className="dotted"></div>
                <div className="dotted"></div>
                <div className="dotted"></div>
                <div className="dotted"></div>
                <div className="dotted"></div>
                <li className="circle">암 정밀의료 <br/>점차 확산</li>
                <div className="dotted"></div>
                <div className="dotted"></div>
                <div className="dotted"></div>
                <div className="dotted"></div><div className="dotted"></div>
                <li className="circle">암 데이터 활용의 <br/>효율성을 극대화</li>
            </ul>
            <div className="necessity text-center  ">
                <ul className="necessity_ul">
                    <li className="necessity_li">연계형 암 데이터의 필요성 증가</li>
                    <li className="necessity_li">암 데이터를 통합, 연계하여 활용 기반을 구축</li>
                    <li className="necessity_li">기개발된 활용 시스템의 다양한 고도화 필요</li>
                    <li className="necessity_li">유의한 바이오 빅데이터 정보 수집</li>
                </ul>
                <h3 className="necessity_tit font-medium leading-tight">암환자<br/>다차원 연계<br/>데이터 활용<br/>시스템 고도화</h3>
            </div>
            
            <h3 className="intro_tit leading-tight">
                <img alt="tit-bar" src={tit_bar2}/>
                <div className="intro_tit_sub">국립 암센터 통합관리체계 구축을 통한</div>다차원 연계 데이터 관리 및 활용 시스템 구축
            </h3>
            <ul className="build_wrap">
                <li className="build">
                    <h3 className="build_tit">암환자 다차원적 연계 데이터 범위 확장</h3>
                    <ul className="build_ul">
                        <li className="build_li">암환자를 대상으로 기개발된 연게 DB에 대상자 및 오믹스 추가</li>
                        <li className="build_li">타 암종 1종 환자 데이터 결합 및 연계</li>
                    </ul>
                </li>
                
                <li className="build">
                    <h3 className="build_tit">다차원적 연계 데이터 활용 시스템 고도화</h3>
                    <ul className="build_ul">
                        <li className="build_li">기개발된 시스템의 시각화 기능 및 차트 추가 개발</li>
                        <li className="build_li">특정 환자의 세부 정보 시각화 기능 구현</li>
                        <li className="build_li">공개 데이터 (예:TGGA 등)활용을 고려한 기능 개발</li>
                    </ul>
                </li>
                
                <li className="build">
                    <h3 className="build_tit">대민 포털 사이트 운영을 위한 개발 환경 및 기능 구축</h3>
                    <ul className="build_ul">
                        <li className="build_li">제안 시스템의 철저한 분석 하에 최적의 방안을 제시</li>
                        <li className="build_li">향후 사용자, 데이터의 증가에 대비하여 확장이 가능한 시스템으로 구축</li>
                        <li className="build_li">제안 시스템은 보안성, 신뢰성, 가용성, 상호운용성 및 유지보수성 등의 확보 필수</li>
                    </ul>
                </li>
                
                <li className="build">
                    <h3 className="build_tit">데이터 분석을 위한 처리(활용) 시스템 구축</h3>
                    <ul className="build_ul">
                        <li className="build_li">데이터 연계 모델 고도화 방안 제시 및 수행</li>
                        <li className="build_li">데이터 분석을 휘한 웹환경 구축</li>
                        <li className="build_li">시각화 기능에 대한 방향성 및 고도화 구현</li>
                        <li className="build_li">관제 시스템 구축 및 모니터링 기능 고도화</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}