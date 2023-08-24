

import React from 'react'

import '../../styles/koreanprivacy.css'
import {
  Link
} from "react-router-dom";
import automatedcollection from '../../assets/images/PrivacyACTImages/automatedcollection.png'
import Generalpersonaliformationcollection from '../../assets/images/PrivacyACTImages/Generalpersonaliformationcollection.png'
import GrievanceHandlingDepartment from '../../assets/images/PrivacyACTImages/GrievanceHandlingDepartment.png'
import Measurestoensuresafety from '../../assets/images/PrivacyACTImages/Measurestoensuresafety.png'
import Personalinformationprocessing from '../../assets/images/PrivacyACTImages/Personalinformationprocessing.png'
import PersonalInformatonProtectionOfficer from '../../assets/images/PrivacyACTImages/PersonalInformatonProtectionOfficer.png'
import processingconsignment from '../../assets/images/PrivacyACTImages/processingconsignment.png'
import Processingitems from '../../assets/images/PrivacyACTImages/Processingitems.png'
import Provisionofpersonalinformation from '../../assets/images/PrivacyACTImages/Provisionofpersonalinformation.png'
import Purposeofpersonalinformationprocessing from '../../assets/images/PrivacyACTImages/Purposeofpersonalinformationprocessing.png'
import RemediesforInfringementofRights from '../../assets/images/PrivacyACTImages/RemediesforInfringementofRights.png'
import requestforreading from '../../assets/images/PrivacyACTImages/requestforreading.png'
import RightsandObligationsofDataSubjects from '../../assets/images/PrivacyACTImages/RightsandObligationsofDataSubjects.png'
import Attachments from '../../assets/files/Attachment.hwp'
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';


function Koreanprivacyact() {
  const title = { id: "PrivacyPolicy", defaultMessage: "PrivacyPolicy" }

  const breadCrumbs = {
    '/privacypolicy/': [
      { id: 'PrivacyPolicy', defaultMessage: 'PrivacyPolicy', to: '/privacypolicy/' }
    ],
  };
  return (

    <>
      <HeaderComponent
        title={title}
        breadCrumbs={breadCrumbs['/privacypolicy/']}
        type="single"
      />

      <article id="subContents" className="subContents">
        <div>
          <div className="contentsTitle">
            <div className="auto">
              <h3 className="colorSecondary">
                <span className="colorPrimary">Privacy</span>
                Policy
              </h3>
            </div>
          </div>
          <div className="ptn">
            <div className="auto">
              <div>
                <div id="DIV_2" className=''>
                  <div id="DIV_52">
                    <h4 id="H4_62">
                      국립암센터(국가암데이터센터) K-CORE 포털 개인정보처리방침
                    </h4>
                    <p className='MarginTop10' >
                      국립암센터 국가암데이터센터 내에서 운영하고 있는 K-CORE 포털은 ｢개인정보 보호법｣ 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
                    </p>
                    <div className='div_64'>
                      <div className='div_64_1'> [주요 개인정보 처리 표시(라벨링)]</div>
                      <div className='div_64_box'>
                        <div className='div_64_box_div'>
                          <img src={RightsandObligationsofDataSubjects}
                            alt="정보주체의권리의무" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>정보주체의권리의무</span>
                        </div>
                        <div className='div_64_box_div' >
                          <img src={requestforreading}
                            alt="열람청구" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>열람청구
                          </span>
                        </div>
                        <div className='div_64_box_div'>
                          <img src={RemediesforInfringementofRights}
                            alt="권익침해구제" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>권익침해구제</span>
                        </div>
                        <div className='div_64_box_div'>
                          <img src={Purposeofpersonalinformationprocessing}
                            alt="개인정보처리목적" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>개인정보처리목적</span>
                        </div>
                        <div className='div_64_box_div'>
                          <img src={Provisionofpersonalinformation}
                            alt="개인정보의 제공" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>개인정보의 제공</span>
                        </div>
                        <div className='div_64_box_div'>
                          <img src={Processingitems}
                            alt="처리항목" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>처리항목</span>
                        </div>
                        <div className='div_64_box_div'>
                          <img src={processingconsignment}
                            alt="처리위탁 " id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>처리위탁</span>
                        </div>
                        <div className='div_64_box_div'>
                          <img src={PersonalInformatonProtectionOfficer}
                            alt="개인정보보호책임자" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>개인정보보호책임자</span>
                        </div>
                        <div className='div_64_box_div'>
                          <img src={Personalinformationprocessing}
                            alt="개인정보처리" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>개인정보처리</span>
                        </div>
                        <div className='div_64_box_div'>
                          <img src={Measurestoensuresafety}
                            alt="안전성확보조치" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>안전성확보조치</span>
                        </div>
                        <div className='div_64_box_div'>
                          <img src={GrievanceHandlingDepartment}
                            alt="고충처리부서" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>고충처리부서</span>
                        </div>
                        <div className='div_64_box_div'>
                          <img src={Generalpersonaliformationcollection}
                            alt="일반개인정보 수집" id="IMG_82" className='div_64_box_img' />
                          <span className='div_64_box_text'>일반개인정보 수집</span>
                        </div>
                      </div>
                    </div>
                    <div className='' style={{ marginTop: '5%' }}>
                      <div >
                        <table className="ktable"  >
                          <thead className='kth'>
                            <tr>
                              <th className='kth'>목 차</th>
                              <th className='kth '>
                                이름</th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className='ktd'>제1 조</td>
                              <td className='ktd'>개인정보의 처리 목적, 처리 항목, 보유기간</td>

                            </tr>
                            <tr className='text-right'>
                              <td className='ktd'>제2 조</td>
                              <td className='ktd'>인터넷 접속정보파일 등 개인정보를 자동으로 수집 </td>
                            </tr>
                            <tr>
                              <td className='ktd'>제3 조</td>
                              <td className='ktd'>개인정보의 파기 절차 및 방법</td>
                            </tr>
                            <tr>
                              <td className='ktd'>제4 조</td>
                              <td className='ktd'>개인정보처리의 위탁에 관한 사항</td>

                            </tr>
                            <tr>
                              <td className='ktd'>제5 조</td>
                              <td className='ktd'> 개인정보 안정성 확보조치</td>

                            </tr>
                            <tr>
                              <td className='ktd'>제6 조</td>
                              <td className='ktd'> 정보주체와 법정대리인의 권리·의무 및 그 행사법</td>

                            </tr>
                            <tr>
                              <td className='ktd'>제7 조</td>
                              <td className='ktd'> 개인정보의 열람청구를 접수·처리하는 부서</td>

                            </tr>
                            <tr>
                              <td className='ktd'>제8 조</td>
                              <td className='ktd'> 권익침해 구제방법</td>

                            </tr>
                            <tr>
                              <td className='ktd'>제9 조</td>
                              <td className='ktd'> 개인정보보호 책임자 및 담당자 연락처</td>

                            </tr>
                            <tr>
                              <td className='ktd'>제10 조</td>
                              <td className='ktd'> 개인정보 처리방침의 변경</td>

                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                    <h5 className='flex m-5'>
                      <span id="SPAN_128">제1조 개인정보의 처리 목적, 처리 항목, 보유기간  </span>
                      <img
                        src={Generalpersonaliformationcollection} alt="일반개인정보 수집"
                        id="IMG_129" />
                      <img src={Purposeofpersonalinformationprocessing}
                        alt="개인정보처리목적" id="IMG_130" />
                      <img src={Processingitems} alt="처리항목"
                        id="IMG_131" />
                      <img src={Personalinformationprocessing}
                        alt="개인정보처리" id="IMG_132" />
                    </h5>

                    <div className='div_64 MarginTop10' style={{ padding: '2%' }}>
                      <span>①	 국립암센터(국가암데이터센터) K-CORE에서 처리하고 있는 개인정보는「개인정보보호법」제15조(개인정보의 수집ㆍ이용)에 따라서 관련 법률의 개인정보 보호 규정을 준수하여 처리하고 있습니다</span>
                      <div className='MarginTop10'>
                        <table className='ktable'>
                          <tbody >
                            <tr >
                              <th className='kth'>
                                구분
                              </th>
                              <th className='kth'>
                                처리목적 및 관련 근거

                              </th>
                              <th className='kth'>
                                개인정보 항목
                              </th>
                              <th className='kth'>
                                보유기간
                              </th>
                            </tr>
                            <tr >
                              <td className='ktd'>
                                K-CORE portal 회원정보
                              </td>
                              <td className='ktd'>
                                개인정보보호법
                                <br />
                                제15조 제1항
                              </td>
                              <td className='ktd'>
                                아이디, 비밀번호, 신청자 정보(이름, 연락처, 이메일), 소속정보(정부(공공)기관, 대학, 연구소, 의료기관, 산업체, 기타), 접속정보
                              </td>
                              <td className='ktd'>
                                2년 회원탈퇴시 즉시 삭제
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className='MarginTop10'>② 국립암센터(국가암데이터센터) K-CORE에서 처리하고 있는 개인정보 관련 법률은 「암관리법 제9조의2(암데이터사업)」 및 「개인정보 보호법」 제15조(개인정보의 수집ㆍ이용) 제1항 제2호,「개인정보 보호법」 제28조의2(가명정보의 처리 등)에 따라서 개인정보 보호 규정을 준수하여 처리하고 있습니다.</p>
                      <p className='MarginTop10'>③	국립암센터(국가암데이터센터) K-CORE에서 운용하고 있는 개인정보는 특정 개인을 알아보기 위하여 사용될 수 있는 정보를 포함하지 않으며, 개인을 알아볼 수 있는 정보가 생성된 경우에는 즉시 해당 정보의 처리를 중지하고, 지체 없이 회수ㆍ파기하고 있습니다.</p>
                    </div>

                    <h5 id="" className='flex m-5'>
                      <span id="SPAN_158">제2조인터넷 접속정보파일 등 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항 </span><img
                        src={automatedcollection} alt="자동화 수집"
                        id="IMG_159" />
                    </h5>

                    <div className='div_64' style={{ padding: '2%' }}>
                      <p className='MarginTop10'>① 국립암센터(국가암데이터센터) K-CORE에서 서비스 이용 과정 시 IP주소, 쿠키, 방문 일시·불량 이용 기록 등의 서비스 이용 기록이 생성되어 수집될 수 있습니다. </p>
                      <p className='MarginTop10'> ② 서비스 이용 과정에서 이용자에 관한 정보를 자동화된 방법으로 생성하여 이를 저장(수집)하거나, 이용자 기기의 고유한 정보를 원래의 값을 확인하지 못하도록 안전하게 변환한 후에 수집합니다. </p>
                      <p className='MarginTop10'>③  ③ 쿠키의 설치·운영 및 거부 방법은 웹브라우저 상단의 도구 &gt;인터넷옵션 &gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다. </p>
                      <p className='MarginTop10'> ④	쿠키 저장을 거부할 경우 웹서비스 이용에 어려움이 발생할 수 있습니다.</p>
                    </div>



                    <h5 id="" className='flex my-5'>
                      <span id="SPAN_165"> 제3조 개인정보의 파기 절차 및 방법 </span><img
                        src={Provisionofpersonalinformation} alt="개인정보의 제공" id="IMG_166" />
                    </h5>

                    <div className='div_64' style={{ padding: '2%' }}>
                      <p className='MarginTop10'>
                        ① 국립암센터(국가암데이터센터) K-CORE에서는 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. </p>
                      <p className='MarginTop10'>② 파기절차, 기한 및 방법은 다음과 같습니다.</p>
                      <ul className='MarginTop10'>
                        <li className='MarginTop10'>
                          <h2>1. 파기절차 </h2>
                          <ul>
                            <li>- 개인정보의 보유기간이 경과하거나, 개인정보의 이용 목적 달성 등 그 개인정보가 불필요하게 되었을 때에는 내부 방침 및 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</li>
                          </ul>
                        </li>
                        <li className='MarginTop10'>
                          <h2>2. 파기방법 </h2>
                          <ul>
                            <li>- 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제 처리합니다.</li>
                          </ul>
                        </li>
                      </ul>
                    </div>



                    <h5 className='flex m-5'>
                      <span id="SPAN_187">제4조(개인정보처리 위탁에 관한 사항) </span><img
                        src={processingconsignment} alt="처리위탁" id="IMG_188" />
                    </h5>



                    <div className='div_64 ' style={{ padding: '2%' }}>
                      <p className='MarginTop10'>①  국립암센터(국가암데이터센터) K-OCRE는 계약업체에 대하여 개인정보보호법 제26조(업무위탁에 따른 개인정보의 처리 제한)에 따라 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>

                      <div className='MarginTop10'>
                        <table className='ktable'>
                          <tbody  >
                            <tr >
                              <th className='kth'>
                                위탁업체
                              </th>
                              <th className='kth' >
                                위탁업무 내용
                              </th>
                              <th className='kth'>
                                위탁 개인정보
                              </th>
                              <th className='kth' >
                                위탁기간
                              </th>
                              <th className='kth'>
                                수탁업체 관리감독 결과
                              </th>
                            </tr>
                            <tr >
                              <td className='ktd'>
                                ㈜3BIGS
                              </td>
                              <td className='ktd'>
                                K-CORE 사업 유지보수
                              </td>
                              <td className='ktd'>
                                회원가입정보(이름, 연락처, 이메일, 소속정보)
                              </td>
                              <td className='ktd'>
                                위탁 계약 종료 시 까지
                              </td>
                              <td className='ktd'>
                                양호
                              </td>
                            </tr>
                            <tr >
                              <td className='ktd'>
                                NICE 평가정보
                              </td>
                              <td className='ktd'>
                                회원가입 시 인증
                              </td>
                              <td className='ktd'>
                                회원인증정보(이름, 연락처, 통신사, 주민번호 앞 7자리)
                              </td>
                              <td className='ktd'>
                                위탁 계약 종료 시 까지
                              </td>
                              <td className='ktd'>
                                양호
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>


                      <p className='MarginTop10'> ② 국립암센터(국가암데이터센터) K-CORE에서는 ①항에 따른 개인정보의 처리 제한에 대해 다음 내용을 포함한 문서에 의하여 처리하고 있습니다. </p>
                      <ul className=''>
                        <li className='MarginTop10'>
                          - 위탁업무 수행 목적 외 개인정보의 처리 금지에 관한 사항
                        </li>
                        <li className='MarginTop10'>
                          - 개인(가명)정보의 안전관리에 관한 사항
                        </li>
                        <li className='MarginTop10'>
                          - 개인(가명)정보의 관리적·기술적 보호조치에 관한 사항
                        </li>
                        <li className='MarginTop10'>
                          - 위탁업무의 목적 및 범위, 재위탁 제한에 관한 사항, 개인(가명)정보 안전성 확보 조치에 관한 사항, 위탁업무와 관련하여 보유하고 있는 개인(가명)정보의 관리현황점검 등 감독에 관한 사항, 수탁자가 준수하여야할 의무를 위반한 경우의 손해배상책임에 관한 사항
                        </li>
                        <li className='MarginTop10'>
                          - 재식별 금지, 재식별 위험발생 시 통지에 관한 사항
                        </li>
                      </ul>
                      <p className='MarginTop10'>③  위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.</p>
                    </div>

                    <h5 className='flex m-5'>
                      <span id="SPAN_227">제5조 개인정보 안전성 확보조치 </span><img
                        src={Measurestoensuresafety} alt="안전성확보조치" id="IMG_228" />
                    </h5>

                    <div className='div_64' style={{ padding: '2%' }}>
                      <p className='MarginTop10'>① 국립암센터(국가암데이터센터) K-CORE에서는「개인정보보호법」제29조(안전조치의무)항목에 의해 개인정보 안전성 확보에 관한 기술적·관리적·물리적 조치를 취하고 있습니다.</p>
                      <ul >
                        <li className='MarginTop10'>
                          1. 관리적 보호조치: 국립암센터는「개인정보 보호 기본지침」및 개인정보보호 종합 추진계획을 통하여 다음 사항이 포함된 내부관리계획을 수립·시행하고 있습니다.
                        </li>
                        <ul >
                          <li className='MarginTop10'>
                            - 개인정보취급자 및 가명정보취급자에 대한 교육에 관한 사항
                          </li>
                          <li >
                            - 개인정보 보호책임자의 지정에 관한 사항                          </li>
                          <li >
                            - 개인정보 보호책임자 및 개인정보취급자의 역할 및 책임에 관한 사항                    </li>
                          <li >
                            - 개인정보 보호조직에 관한 구성 및 운영에 관한 사항
                          </li>
                          <li >
                            - 개인정보 유출사고 대응 계획 수립·시행에 관한 사항             </li>
                        </ul>
                        <li className='MarginTop10'>
                          2. 기술적 보호조치
                        </li>
                        <ul >
                          <li className='MarginTop10'>
                            - 접근권한 관리에 관한 사항
                          </li>
                          <li >
                            - 접근통제에 관한 사항
                          </li>
                          <li >
                            - 개인정보의 암호화 조치에 관한 사항
                          </li>
                          <li>
                            - 접속기록 보관 및 점검에 관한 사항
                          </li>
                          <li>
                            - 악성프로그램 등 방지에 관한 사항
                          </li>
                        </ul>
                        <li className='MarginTop10'>
                          3. 물리적 보호조치                            </li>
                        <ul className='MarginTop10'>
                          <li className=''>

                            - 물리적 안전조치에 관한 사항
                          </li>
                        </ul>
                      </ul>
                    </div>



                    <h5 className='flex m-5'>
                      <span id="SPAN_227">제6조 정보주체와 법정대리인의 권리·의무 및 그 행사법 </span><img
                        src={Measurestoensuresafety} alt="안전성확보조치" id="IMG_228" />
                    </h5>


                    <div className='div_64' style={{ padding: '2%' }}>
                      <ul className=''>
                        <li>① 정보주체는 다음과 같은 권리를 행사할 수 있습니다.</li>
                        <li className='MarginTop10'>
                          1. 개인정보 열람 요구 : 보유하고 있는 개인정보파일은「개인정보보호법」제35조(개인정보의 열람)에 따라 열람을 요구할 수 있습니다. 다만, 개인정보 열람 요구 시 법 제35조 5항에 의하여 다음과 같이 제한될 수 있습니다.
                        </li>
                        <ul className=''>
                          <li className='MarginTop10'>
                            - 법률에 따라 열람이 금지되거나 제한되는 경우
                            <ul>
                              <li>- 다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우  </li>
                              <li>- 공공기관이 다음 각 목의 어느 하나에 해당하는 업무를 수행할 때 중대한 지장을 초래하는 경우</li>
                              <li>- 공공기관이 다음 각 목의 어느 하나에 해당하는 업무를 수행할 때 중대한 지장을 초래하는 경우
                                <ul>
                                  <li>가. 조세의 부과ㆍ징수 또는 환급에 관한 업무</li>
                                  <li>나. 「초ㆍ중등교육법」 및 「고등교육법」에 따른 각급 학교, 「평생교육법」에 따른 평생교육시설, 그 밖의 다른 법률에 따라 설치된 고등교육기관에서의 성적 평가 또는 입학자 선발에 관한 업무</li>
                                  <li>다. 학력ㆍ기능 및 채용에 관한 시험, 자격 심사에 관한 업무</li>
                                  <li>라. 보상금ㆍ급부금 산정 등에 대하여 진행 중인 평가 또는 판단에 관한 업무</li>
                                  <li>마. 다른 법률에 따라 진행 중인 감사 및 조사에 관한 업무</li>
                                </ul>
                              </li>
                            </ul>
                          </li>

                        </ul>
                        <li className='MarginTop10'>
                          2. 개인정보 정정·삭제 요구 : 보유하고 있는 개인정보파일은「개인정보보호법」제36조(개인정보의 정정·삭제)에 따라 정정·삭제를 요구할 수 있습니다. 다만, 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
                        </li>

                        <li className='MarginTop10' >
                          3. 개인정보 처리정지 요구 : 보유하고 있는 개인정보파일은 「개인정보보호법」제37조(개인정보의 처리정지 등)에 따라 처리정지를 요구할 수 있습니다. 다만, 개인정보 처리정지 요구 시 법 제37조 제2항에 의하여 처리정지 요구를 거절할 수 있습니다.                      </li>
                        <ul className=''>
                          <li >

                            - 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우
                          </li>
                          <li>- 다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우</li>
                          <li>- 공공기관이 개인정보를 처리하지 아니하면 다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우</li>
                          <li>- 개인정보를 처리하지 아니하면 정보주체와 약정한 서비스를 제공하지 못하는 등 계약의 이행이 곤란한 경우로서 정보주체가 그 계약의 해지 의사를 명확하게 밝히지 아니한 경우</li>
                        </ul>
                      </ul>
                    </div>




                    {/* 7 */}

                    <h5 className='flex m-5'>
                      <span id="SPAN_286">제7조 개인정보의 열람청구를 접수·처리하는 부서 </span>
                      <img
                        src={RemediesforInfringementofRights} alt="권익침해구제" id="IMG_287" />
                    </h5>

                    <div className='div_64' style={{ padding: '2%' }}>
                      <p > ① 정보주체는 개인정보보호법 제35조에 따른 개인정보의 열람청구를 아래의 부서에 할 수 있습니다. 정보주체의 개인정보 열람청구가 신속하게 처리되도록 하겠습니다. </p>
                      <ul className='MarginTop10'>
                        <li >
                          - 부서명 : 데이터운영팀
                        </li>
                        <li >
                          - 담당자 : 오세희
                        </li>
                        <li >
                          - 연락처 : 031-920-1891(전화번호), evolution@ncc.re.kr(이메일)
                        </li>
                        <li >
                          <a href={Attachments} download style={{ color: 'cornflowerblue' }}>☞ [첨부 1] 개인정보열람_정정_삭제_처리요구서</a>
                        </li>
                      </ul>
                    </div>


                    {/* 8 */}

                    <h5 className=' flex m-5'>
                      <span id="SPAN_301">제8조 권익침해 구제방법 </span>
                      <img
                        src={RemediesforInfringementofRights} alt="권익침해구제" id="IMG_287" />
                    </h5>

                    <div className='div_64' style={{ padding: '2%' }}>
                      <p className='MarginTop10'>① 정보주체는 개인정보침해로 인한 피해를 구제 받기 위하여 개인정보 분쟁조정위원회, 한국인터넷진흥원 개인정보 침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.</p>
                      <ul className='MarginTop10'>
                        <li>- 개인정보분쟁조정위원회 : 1833-6972 (http://www.kopico.go.kr)</li>
                        <li>- 개인정보 침해신고센터 : 118 (http://privacy.kisa.or.kr)</li>
                        <li>- 대검찰청 사이버수사과 : 1301 (http://www.spo.go.kr)</li>
                        <li>- 경찰청 사이버안전국 : 182 (http://cyberbureau.police.go.kr)</li>
                      </ul>

                      <p className='MarginTop10'>② 「개인정보보호법」제35조(개인정보의 열람), 제37조(개인정보의 처리정지 등)의 규정에 의한 정보주체의 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 정보주체는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.</p>
                      <p className='MarginTop10'>※ 행정심판에 대해 자세한 사항은 행정심판위원회(http://www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.  </p>
                    </div>

                    {/* 9 */}



                    <h5 className='flex m-5'>
                      <span id="SPAN_305">제9조(개인정보보호 책임자 및 담당자 연락처) </span><img
                        src={PersonalInformatonProtectionOfficer} alt="개인정보보호책임자" id="IMG_306" />
                    </h5>

                    <div className='div_64 MarginTop10' style={{ padding: '2%' }}>
                      ①	개인정보를 보호 및 관련 고충사항에 대한 민원을 처리하기 위하여 아래와 같이 개인정보보호책임자 및 실무담당자를 지정하고 있습니다.

                      <div className='MarginTop10'>
                        <table className='' >
                          <tbody className='ktable'>
                            <tr >
                              <th className='kth' style={{ padding: '2%' }}>
                                구분
                              </th>
                              <th className='kth'>
                                담당자
                              </th>
                              <th className='kth'>
                                부서명
                              </th>
                              <th className='kth'>
                                연락처
                              </th>
                            </tr>
                            <tr>
                              <td className='ktd'>
                                <ul>
                                  <li>
                                    국립암센터
                                  </li>
                                  <li>
                                    개인정보보호책임자
                                  </li>
                                </ul>
                              </td>
                              <td className='ktd'>
                                손대경
                              </td>
                              <td className='ktd'>
                                헬스케어플랫폼센터
                              </td>
                              <td className='ktd'>
                                <ul>
                                  <li >
                                    - 전화번호 : 031-920-1636
                                  </li>
                                  <li >
                                    - 이메일: gsgsbal@ncc.re.kr
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr >
                              <td className='ktd' >
                                <ul>
                                  <li>
                                    국립암센터
                                  </li>
                                  <li>
                                    개인정보보호 담당
                                  </li>
                                </ul>
                              </td>
                              <td className='ktd'>
                                이동역
                              </td>
                              <td className='ktd'>
                                헬스케어플랫폼센터
                              </td>
                              <td className='ktd'>
                                <ul >
                                  <li >
                                    - 전화번호 : 031-920-0642
                                  </li>
                                  <li >
                                    - 이메일: inverse76@ncc.re.kr
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr >
                              <td className='ktd'>
                                <ul className='ms-5'>
                                  <li >
                                    국가암데이터센터(NCDC)
                                  </li>
                                  <li >
                                    개인정보보호 책임자
                                  </li>
                                </ul>
                              </td>
                              <td className='ktd'>
                                차효성
                              </td>
                              <td className='ktd'>
                                암빅데이터센터
                              </td>
                              <td className='ktd'>
                                <ul >
                                  <li >
                                    - 전화번호 : 031-920-1892
                                  </li>
                                  <li >
                                    - 이메일: kkido@ncc.re.kr
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr >
                              <td className='ktd'>
                                <ul >
                                  <li >
                                    국가암데이터센터(NCDC)
                                  </li>
                                  <li >
                                    개인정보보호 담당
                                  </li>
                                </ul>
                              </td>
                              <td className='ktd' >
                                김도엽
                              </td>
                              <td className='ktd'>
                                암빅데이터센터
                              </td>
                              <td className='ktd' >
                                <ul >
                                  <li >
                                    - 전화번호 : 031-920-0774
                                  </li>
                                  <li >
                                    - 이메일: kimdy@ncc.re.kr
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className='MarginTop10'>②	국립암센터(국가암데이터센터) K-CORE를 이용하시면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 국가암데이터센터 개인정보보호 담당, 개인정보 보호책임자 및 실무담당자에게 문의하실 수 있습니다. 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p>
                    </div>


                    {/* 10 */}
                    <h5 className='flex m-5'>
                      <span id="SPAN_355">제10조 개인정보 처리방침의 변경 </span><img
                        src={Purposeofpersonalinformationprocessing}
                        alt='개인정보처리목적'
                        id="IMG_356" />
                    </h5>

                    <div className='div_64' style={{ padding: '2%' }}>
                      <p >① 이 개인정보 처리방침은 2022. 09. 30.부터 적용됩니다. 이전의 개인정보 처리방침은 아래에서 확인할 수 있습니다.</p>
                      <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Link className="capitalize" to='/oldprivacypolicy'>
                          <button className="btn btnPrimary" style={{ borderRadius: '25px' }}>이전 개인정보처리방침 2022. 09. 30</button>
                        </Link>
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default Koreanprivacyact;