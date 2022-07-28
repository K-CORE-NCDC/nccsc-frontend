

import React from 'react'

import '../../styles/koreanprivacy.css'

import destruction from '../../assets/images/PrivacyACTImages/destruction.png'
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
// import Attachmentone from '../../assests/attachment'


function Koreanprivacyact() {
    return (
        <div>
            <div id="DIV_2" className='m-14'>
                <div id="DIV_52">
                    <h4 id="H4_62">
                        국립암센터(국가암데이터센터) K-CORE 포털 개인정보처리방침
                    </h4>
                    <p id="P_63" >
                        국립암센터 국가암데이터센터 내에서 운영하고 있는 K-CORE 포털은 ｢개인정보 보호법｣ 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
                    </p>
                    {/* <div id="DIV_64">
                        <div className='text-center'>
                            [주요 개인정보 처리 표시(라벨링)]

                        </div>

                        <table id="TABLE_66">
                            <caption id="CAPTION_67">
                                개인정보보유기간, 개인정보보호책임자, 개인정보의 제공, 개인정보처리, 개인정보처리목적 ,고충처리부서, 권익침해구제, 안전성확보조치,열람청구,일반개인정보 수집,자동화 수집,정보주체의권리의무,처리위탁,처리항목,파기
                            </caption>
                            <colgroup id="COLGROUP_68">
                                <col id="COL_69" />
                                <col id="COL_70" />
                                <col id="COL_71" />
                            </colgroup>
                            <tbody id="TBODY_72">
                                <tr id="TR_73" className='flex-row'>
                                    <td id="TD_74">
                                        <img src="https://www.cancerdata.re.kr/datalink/images/personInfo7.png"
                                            alt="개인정보보호책임자" id="IMG_75" className='ml-5' />
                                        <span id="SPAN_76">일반 개인정보<br id="BR_77" />*
                                            개인정보보호책임자수집</span>
                                    </td>
                                    <td id="TD_78">
                                        <img src="https://www.cancerdata.re.kr/datalink/images/personInfo7.png"
                                            alt="개인정보의 제공" id="IMG_79" /> <span id="SPAN_80">개인정보의 제공</span>
                                    </td>
                                    <td id="TD_81">
                                        <img src="https://www.cancerdata.re.kr/datalink/images/personInfo3.png"
                                            alt="개인정보처리" id="IMG_82" /> <span id="SPAN_83">개인정보처리</span>
                                    </td>
                                </tr>
                                <tr id="TR_73" className='flex-row'>
                                    <td id="TD_74" className='flex-col place-items-center'>
                                        <img src="https://www.cancerdata.re.kr/datalink/images/personInfo7.png" className='ms-5'
                                            alt="개인정보보호책임자" id="IMG_75" /> <span id="SPAN_76">일반 개인정보<br id="BR_77" />*
                                                개인정보보호책임자수집</span>
                                    </td>
                                    <td id="TD_78">
                                        <img src="https://www.cancerdata.re.kr/datalink/images/personInfo7.png"
                                            alt="개인정보의 제공" id="IMG_79" /> <span id="SPAN_80">개인정보의 제공</span>
                                    </td>
                                    <td id="TD_81">
                                        <img src="https://www.cancerdata.re.kr/datalink/images/personInfo3.png"
                                            alt="개인정보처리" id="IMG_82" /> <span id="SPAN_83">개인정보처리</span>
                                    </td>
                                </tr>


                            </tbody>
                        </table>

                    </div> */}

                    <div id='DIV_64'>

                        <div className='text-center mb-5'>
                            [주요 개인정보 처리 표시(라벨링)]

                        </div>

                        <div className='grid grid-cols-3 grid-rows-3'>
                            <div className='grid justify-items-center'>
                                <img src={RightsandObligationsofDataSubjects}
                                    alt="정보주체의권리의무" id="IMG_82" className='m-2' />
                                <span id="SPAN_83" className='m-2'>정보주체의권리의무</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={requestforreading}
                                    alt="열람청구" id="IMG_82" />
                                <span id="SPAN_83">열람청구</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={RemediesforInfringementofRights}
                                    alt="권익침해구제" id="IMG_82" />
                                <span id="SPAN_83">권익침해구제</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={Purposeofpersonalinformationprocessing}
                                    alt="개인정보처리목적" id="IMG_82" />
                                <span id="SPAN_83">개인정보처리목적</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={Provisionofpersonalinformation}
                                    alt="개인정보의 제공" id="IMG_82" />
                                <span id="SPAN_83">개인정보의 제공</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={Processingitems}
                                    alt="처리항목" id="IMG_82" />
                                <span id="SPAN_83">처리항목</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={processingconsignment}
                                    alt="처리위탁 " id="IMG_82" />
                                <span id="SPAN_83">처리위탁</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={PersonalInformatonProtectionOfficer}
                                    alt="개인정보보호책임자" id="IMG_82" />
                                <span id="SPAN_83">개인정보보호책임자</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={Personalinformationprocessing}
                                    alt="개인정보처리" id="IMG_82" />
                                <span id="SPAN_83">개인정보처리</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={Measurestoensuresafety}
                                    alt="안전성확보조치" id="IMG_82" />
                                <span id="SPAN_83">안전성확보조치</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={GrievanceHandlingDepartment}
                                    alt="고충처리부서" id="IMG_82" />
                                <span id="SPAN_83">고충처리부서</span>
                            </div>
                            <div className='grid justify-items-center'>
                                <img src={Generalpersonaliformationcollection}
                                    alt="일반개인정보 수집" id="IMG_82" />
                                <span id="SPAN_83">일반개인정보 수집</span>
                            </div>
                        </div>
                    </div>
                    <div id='DIV_94'>
                        <div id='' style={{ marginLeft: "200px" }}>
                            <table class="ktable" style={{ width: "70rem" }}>
                                <thead className='kth'>
                                    <tr>
                                        <th className='kth'>목 차</th>
                                        <th className='kth'>
                                            이름</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='ktd'>제1</td>
                                        <td className='ktd'>조(개인정보의 처리 목적, 처리 항목, 보유기간)</td>

                                    </tr>
                                    <tr className='text-right'>
                                        <td className='ktd'>제2</td>
                                        <td className='ktd'>조(인터넷 접속정보파일 등 개인정보를 자동으로 수집 </td>
                                    </tr>
                                    <tr>
                                        <td className='ktd'>제3</td>
                                        <td className='ktd'>조 (개인정보의 파기 절차 및 방법)</td>

                                    </tr>
                                    <tr>
                                        <td className='ktd'>제4</td>
                                        <td className='ktd'>조 (개인정보처리의 위탁에 관한 사항)</td>

                                    </tr>
                                    <tr>
                                        <td className='ktd'>제5</td>
                                        <td className='ktd'> 조 (개인정보 안정성 확보조치)</td>

                                    </tr>
                                    <tr>
                                        <td className='ktd'>제6</td>
                                        <td className='ktd'>조 (정보주체와 법정대리인의 권리·의무 및 그 행사법)</td>

                                    </tr>
                                    <tr>
                                        <td className='ktd'>제7</td>
                                        <td className='ktd'>조 (개인정보의 열람청구를 접수·처리하는 부서)</td>

                                    </tr>
                                    <tr>
                                        <td className='ktd'>제8</td>
                                        <td className='ktd'>조 (권익침해 구제방법)</td>

                                    </tr>
                                    <tr>
                                        <td className='ktd'>제9</td>
                                        <td className='ktd'>조 (개인정보보호 책임자 및 담당자 연락처)</td>

                                    </tr>
                                    <tr>
                                        <td className='ktd'>제10</td>
                                        <td className='ktd'>조 (개인정보 처리방침의 변경)</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>


                    {/* <div id="DIV_94">
                        <p id="P_95">
                            목 차
                        </p>
                        <div id="DIV_96" >
                            <div id="" className='m-auto' >
                                <ul id="UL_98" >
                                    <li style={{ borderBottom: "1px solid black" }}>
                                        <p
                                            id="A_100">제1 조(개인정보의 처리 목적, 처리 항목, 보유기간)</p>
                                    </li>
                                    <li style={{ borderBottom: "1px solid black" }}>
                                        <p
                                            id="A_102">제2 조(인터넷 접속정보파일 등 개인정보를 자동으로 수집 <span className='m-8'>  하는 장치의 설치·운영 및 그 거부에 관한 사항)</span></p>
                                    </li>
                                    <li style={{ borderBottom: "1px solid black" }}>
                                        <p
                                            id="A_104">제3 조 (개인정보의 파기 절차 및 방법)</p>
                                    </li>
                                    <li style={{ borderBottom: "1px solid black" }}>
                                        <p
                                            id="A_106">제4 조 (개인정보처리의 위탁에 관한 사항)</p>
                                    </li>
                                    <li style={{ borderBottom: "1px solid black" }}>
                                        <p
                                            id="A_108">제5 조 (개인정보 안정성 확보조치)</p>
                                    </li>
                                </ul>
                            </div>

                            <div id="DIV_112">
                                <ul id="UL_113" className=''>
                                    <li style={{ borderBottom: "1px solid black" }} >
                                        <p
                                            id="A_110">제6 조 (정보주체와 법정대리인의 권리·의무 및 그 행사법)</p>
                                    </li>
                                    <li style={{ borderBottom: "1px solid black" }}>
                                        <p
                                            id="A_115">제7 조 (개인정보의 열람청구를 접수·처리하는 부서)</p>
                                    </li>
                                    <li style={{ borderBottom: "1px solid black" }}>
                                        <p
                                            id="A_117">제8 조 (권익침해 구제방법)</p>
                                    </li>
                                    <li style={{ borderBottom: "1px solid black" }}>
                                        <p
                                            id="A_119">제9 조 (개인정보보호 책임자 및 담당자 연락처)</p>
                                    </li>
                                    <li style={{ borderBottom: "1px solid black" }} >
                                        <p
                                            id="A_121">제10 조 (개인정보 처리방침의 변경)</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> */}


                    <h5 className='flex m-5'>
                        <span id="SPAN_128">제1조(개인정보의 처리 목적, 처리 항목, 보유기간)</span>
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

                    <div id="DIV_134" className='m-5'>
                        ① 국립암센터(국가암데이터센터) K-CORE에서 처리하고 있는 개인정보는「개인정보보호법」제15조(개인정보의 수집ㆍ이용)에 따라서 관련 법률의 개인정보 보호 규정을 준수하여 처리하고 있습니다<br id="BR_135" />
                        <table id="TABLE_136">

                            <caption id="CAPTION_137">
                                반출신청현황 테이블이며, 순서, KISA신청번호, 반출신청번호, 신청일자 ,신청자, 진행상태, 비고 항목으로 구성
                            </caption>
                            <colgroup id="COLGROUP_138">
                                <col id="COL_139" />
                                <col id="COL_140" />
                                <col id="COL_141" />
                            </colgroup>
                            <tbody id="TBODY_142">
                                <tr id="TR_143">
                                    <th id="TH_144">
                                        처리목적 및 관련 근거
                                    </th>
                                    <th id="TH_145">
                                        개인정보 항목
                                    </th>
                                    <th id="TH_146">
                                        보유기간
                                    </th>
                                </tr>
                                <tr id="TR_147">
                                    <td id="TD_148">
                                        개인정보보호법 제15조 제1항<br id="BR_149" />(데이터결합시스템 신청회원관리)
                                    </td>
                                    <td id="TD_150">
                                        <span id="SPAN_151">[필수]</span><br id="BR_152" />아이디, 비밀번호, 신청자 정보(이름, 연락처,
                                        이메일), 회사소속정보(회사명, 회사연락처, 부서명, 회사 이메일, 대표자명, 사업자등록번호, 사업자등록증 사본), 접속정보(일시, ip)<br
                                            id="BR_153" />[선택] 해당없음
                                    </td>
                                    <td id="TD_154">
                                        2년(회원탈퇴 시, 즉시 삭제)
                                    </td>
                                </tr>
                            </tbody>
                        </table><br id="BR_155" /> ② 국립암센터(국가암데이터센터) K-CORE에서 처리하고 있는 개인정보「암관리법 제9조의2(암데이터사업)」및「개인정보 보호법」제15조(개인정보의 수집ㆍ이용) 제1항 제2호,「개인정보 보호법」제28조의2(가명정보의 처리 등)에 따라서 관련 법률의 개인정보 보호 규정을 준수하여 처리하고 있습니다.<br id="BR_156" />
                        ③ 국립암센터(국가암데이터센터) K-CORE에서 운용하고 있는 개인정보는 특정 개인을 알아보기 위하여 사용될 수 있는 정보를 포함하지 않으며, 개인을 알아볼 수 있는 정보가 생성된 경우에는 즉시 해당 정보의 처리를 중지하고, 지체 없이 회수ㆍ파기하고 있습니다.
                    </div>

                    <h5 id="" className='flex m-5'>
                        <span id="SPAN_158">제2조(인터넷 접속정보파일 등 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항)</span><img
                            src={automatedcollection} alt="자동화 수집"
                            id="IMG_159" />
                    </h5>

                    <div id="DIV_160">
                        ① 국립암센터(국가암데이터센터) K-CORE에서 서비스 이용 과정 시 IP주소, 쿠키, 방문 일시·불량 이용 기록 등의 서비스 이용 기록이 생성되어 수집될 수 있습니다.<br
                            id="BR_161" /> ② 서비스 이용 과정에서 이용자에 관한 정보를 자동화된 방법으로 생성하여 이를 저장(수집)하거나, 이용자 기기의 고유한 정보를 원래의 값을 확인하지 못하도록 안전하게 변환한 후에 수집하는 경우입니다.<br id="BR_162" />③
                        쿠키의 설치·운영 및 거부 방법은 웹브라우저 상단의 도구 &gt;인터넷옵션 &gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.
                        &gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.<br id="BR_163" /> ④ 쿠키 저장을 거부할 경우 웹서비스 이용에 어려움이 발생할 수 있습니다.
                    </div>

                    <h5 id="" className='flex my-5'>
                        <span id="SPAN_165"> 제3조 (개인정보의 파기 절차 및 방법)</span><img
                            src={Provisionofpersonalinformation} alt="개인정보의 제공" id="IMG_166" />
                    </h5>

                    <div id="DIV_167">
                        ① 국립암센터(국가암데이터센터)에서는 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.
                        <br id="BR_168" />② 파기절차, 기한 및 방법은 다음과 같습니다.
                        <ul className='m-5'>
                            <li>

                                <h2>1. 파기절차</h2>
                                <ul>
                                    <li>- 개인정보의 보유기간이 경과하거나, 개인정보의 이용 목적 달성 등 그 개인정보가 불필요하게 되었을 때에는 내부 방침 및 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</li>
                                </ul>
                            </li>
                            <li>
                                <h2>2. 파기방법</h2>
                                <ul>
                                    <li>- 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제 처리합니다.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <h5 className='flex m-5'>
                        <span id="SPAN_187">제4조 (개인정보처리의 위탁에 관한 사항)</span><img
                            src={processingconsignment} alt="처리위탁" id="IMG_188" />
                    </h5>

                    <div id="DIV_189">
                        <table id="TABLE_191">

                            <tbody id="TBODY_199" >
                                <tr id="TR_200">
                                    <th id="TH_201">
                                        위탁업체
                                    </th>
                                    <th id="TH_202">
                                        위탁업무내용
                                    </th>
                                    <th id="TH_203">
                                        위탁개인정보
                                    </th>
                                    <th id="TH_204">
                                        위탁기간
                                    </th>
                                    <th id="TH_205">
                                        수탁업체 관리감독 결과
                                    </th>
                                </tr>
                                <tr id="TR_206">
                                    <td id="TD_207">
                                        ㈜3BIGS
                                    </td>
                                    <td id="TD_208">
                                        K-CORE 사업 유지보수
                                    </td>
                                    <td id="TD_209">
                                        회원가입정보(이름, 연락처, 이메일, 소속정보)
                                    </td>
                                    <td id="TD_210">
                                        위탁 계약 종료 시 까지
                                    </td>
                                    <td id="TD_211">
                                        양호
                                    </td>
                                </tr>
                                <tr id="TR_212">
                                    <td id="TD_213">
                                        NICE 평가정보
                                    </td>
                                    <td id="TD_214">
                                        회원가입 시 인증
                                    </td>
                                    <td id="TD_215">
                                        회원인증정보(이름, 연락처, 통신사, 주민번호 앞 7자리)
                                    </td>
                                    <td id="TD_216">
                                        위탁 계약 종료 시 까지
                                    </td>
                                    <td id="TD_217">
                                        양호
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className='mb-2'>①항에 따른 개인정보의 처리 제한에 대해 다음 내용을 포함한 문서에 의하여 처리하고 있습니다.</p>
                        <p>  ② 국가암데이터센터 데이터결합시스템에서는 </p>  <br
                            id="BR_218" />
                        <ul className='m-4'>
                            <li >
                                - 위탁업무 수행 목적 외 개인정보의 처리 금지에 관한 사항
                            </li>
                            <li >
                                - 개인(가명)정보의 안전관리에 관한 사항
                            </li>
                            <li >
                                - 개인(가명)정보의 관리적·기술적 보호조치에 관한 사항
                            </li>
                            <li >
                                - 위탁업무의 목적 및 범위, 재위탁 제한에 관한 사항, 개인(가명)정보 안전성 확보 조치에 관한 사항, 위탁업무와 관련하여 보유하고 있는 개인(가명)정보의
                                관리현황점검 등 감독에 관한 사항, 수탁자가 준수하여야할 의무를 위반한 경우의 손해배상책임에 관한 사항
                            </li>
                            <li >
                                - 재식별 금지, 재식별 위험발생 시 통지에 관한 사항
                            </li>
                        </ul> ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.<br id="BR_225" />
                    </div>

                    <h5 className='flex m-5'>
                        <span id="SPAN_227">제5조 (개인정보 안정성 확보조치)</span><img
                            src={Measurestoensuresafety} alt="안전성확보조치" id="IMG_228" />
                    </h5>
                    <div id="DIV_229">
                        ① 국립암센터(국가암데이터센터) K-CORE에서는「개인정보보호법」제29조(안전조치의무)항목에 의해 개인정보 안전성 확보에 관한 기술적·관리적·물리적 조치를 취하고 있습니다.<br
                            id="BR_230" />
                        <ul className='m-4'>
                            <li >
                                1. 관리적 보호조치
                            </li>
                            <ul className='m-4'>
                                <li >
                                    - 국립암센터는 「개인정보 보호 기본지침」및 개인정보보호 종합 추진계획을 통하여 다음 사항이 포함된 내부관리계획을 수립·시행하고 있습니다.
                                </li>
                                <li >
                                    - 개인정보취급자 및 가명정보취급자에 대한 교육에 관한 사항                            </li>
                                <li >
                                    - 개인정보 보호책임자의 지정에 관한 사항                            </li>
                                <li >
                                    - 개인정보 보호책임자 및 개인정보취급자의 역할 및 책임에 관한 사항
                                </li>
                                <li >
                                    - 개인정보 보호조직에 관한 구성 및 운영에 관한 사항                            </li>
                                <li >
                                    - 개인정보 유출사고 대응 계획 수립·시행에 관한 사항                            </li>
                            </ul>
                            <li >
                                2. 기술적 보호조치
                            </li>
                            <ul className='m-4'>
                                <li >
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
                            </ul>
                            <li >
                                3. 물리적 보호조치                            </li>
                            <ul>
                                <li className='m-4'>

                                    - 물리적 안전조치에 관한 사항
                                </li>
                            </ul>
                        </ul>

                    </div>


                    <h5 className='flex m-5'>
                        <span id="SPAN_227">제6조 (정보주체와 법정대리인의 권리·의무 및 그 행사법)</span><img
                            src={Measurestoensuresafety} alt="안전성확보조치" id="IMG_228" />
                    </h5>
                    <div id="DIV_229" className='ms-4'>
                        정보주체는 다음과 같은 권리를 행사할 수 있습니다.- 악성프로그램 등 방지에 관한 사항                        <br
                            id="BR_230" />
                        <ul className='m-4'>
                            <li >
                                ① 개인정보 열람 요구 : 보유하고 있는 개인정보파일은「개인정보보호법」제35조(개인정보의 열람)에 따라 열람을 요구할 수 있습니다. 다만, 개인정보 열람 요구 시 법 제35조 5항에 의하여 다음과 같이 제한될 수 있습니다.
                            </li>
                            <ul className='m-4'>
                                <li >
                                    - 법률에 따라 열람이 금지되거나 제한되는 경우
                                    <ul>
                                        <li>- 다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우</li>
                                        <li>- 공공기관이 다음 각 목의 어느 하나에 해당하는 업무를 수행할 때 중대한 지장을 초래하는 경우</li>
                                    </ul>
                                </li>

                                <li>
                                    가. 조세의 부과ㆍ징수 또는 환급에 관한 업무
                                </li>
                                <li>나. 「초ㆍ중등교육법」 및 「고등교육법」에 따른 각급 학교, 「평생교육법」에 따른 평생교육시설, 그 밖의 다른 법률에 따라 설치된 고등교육기관에서의 성적평가 또는 입학자 선발에 관한 업무</li>
                                <li >
                                    다. 학력ㆍ기능 및 채용에 관한 시험, 자격 심사에 관한 업무                           </li>
                                <li >
                                    라. 보상금ㆍ급부금 산정 등에 대하여 진행 중인 평가 또는 판단에 관한 업무                         </li>
                                <li >
                                    마. 다른 법률에 따라 진행 중인 감사 및 조사에 관한 업무
                                </li>
                            </ul>
                            <li >
                                ② 개인정보 정정·삭제 요구 : 보유하고 있는 개인정보파일은 「개인정보보호법」제36조(개인정보의 정정·삭제)에 따라 정정·삭제를 요구할 수 있습니다.
                                다만, 개인정보 처리정지 요구 시 법 제37조 제2항에 의하여 처리정지 요구를 거절할 수 있습니다.
                            </li>

                            <li >
                                ③ 개인정보 처리정지 요구 : 보유하고 있는 개인정보파일은 「개인정보보호법」제37조(개인정보의 처리정지 등)에 따라 처리정지를 요구할 수 있습니다.
                                다만, 개인정보 처리정지 요구 시 법 제37조 제2항에 의하여 처리정지 요구를 거절할 수 있습니다.                         </li>
                            <ul className='m-4'>
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
                        <span id="SPAN_286">제7조 (개인정보의 열람청구를 접수·처리하는 부서)</span>
                        <img
                            src={RemediesforInfringementofRights} alt="권익침해구제" id="IMG_287" />
                    </h5>
                    <div id="DIV_288">
                        정보주체는 개인정보보호법 제35조에 따른 개인정보의 열람청구를 아래의 부서에 할 수 있습니다.정보주체의 개인정보 열람청구가 신속하게 처리되도록 하겠습니다.<br id="BR_289" />
                        <ul className='m-5'>
                            <li >
                                - 부서명 : 데이터운영팀
                            </li>
                            <li >
                                - 담당자 : 오세희
                            </li>
                            <li >
                                - 연락처 : 031-920-1891(전화번호), evolution@ncc.re.kr(이메일)
                            </li>
                        </ul>
                        <span id="SPAN_284">
                            <a href="." download></a>
                        </span>
                    </div>

                    {/* 8 */}

                    <h5 className=' flex m-5'>
                        <span id="SPAN_301">제8조 (권익침해 구제방법)</span>
                        <img
                            src={RemediesforInfringementofRights} alt="권익침해구제" id="IMG_287" />
                    </h5>
                    <div id="DIV_302">
                        <p>① 정보주체는 개인정보침해로 인한 피해를 구제 받기 위하여 개인정보 분쟁조정위원회, 한국인터넷진흥원 개인정보 침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.</p>
                        <ul className='m-5'>
                            <li>- 개인정보분쟁조정위원회 : 1833-6972 (http://www.kopico.go.kr)</li>
                            <li>- 개인정보 침해신고센터 : (국번없이)118 (http://privacy.kisa.or.kr)</li>
                            <li>- 대검찰청 사이버수사과 : (국번없이)1301, cid@spo.go.kr (http://www.spo.go.kr)</li>
                            <li>- 경찰청 사이버안전국 : (국번없이)182 (http://cyberbureau.police.go.kr)</li>
                        </ul>

                        <p>②「개인정보보호법」제35조(개인정보의 열람), 제37조(개인정보의 처리정지 등)의 규정에 의한 정보주체의 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 정보주체는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.</p>
                        <p>* 행정심판에 대해 자세한 사항은 행정심판위원회(http://www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.</p>
                    </div>

                    {/* 9 */}


                    <h5 className='flex m-5'>
                        <span id="SPAN_305">제9조 (개인정보보호 책임자 및 담당자 연락처)</span><img
                            src={PersonalInformatonProtectionOfficer} alt="개인정보보호책임자" id="IMG_306" />
                    </h5>
                    <div id="DIV_307" className='m-5'>
                        ① 개인정보를 보호 및 관련 고충사항에 대한 민원을 처리하기 위하여 아래와 같이 개인정보보호책임자 및 실무담당자를 지정하고 있습니다.<br id="BR_308" />
                        <table id="TABLE_309">

                            <tbody id="TBODY_316">
                                <tr id="TR_317">
                                    <th id="TH_318">
                                        구분
                                    </th>
                                    <th id="TH_319">
                                        구분
                                    </th>
                                    <th id="TH_320">
                                        부서명
                                    </th>
                                    <th id="TH_321">
                                        연락처
                                    </th>
                                </tr>
                                <tr id="TR_322">
                                    <td id="TD_323">
                                        국립암센터 개인정보보호책임자
                                    </td>
                                    <td id="TD_324">
                                        손대경
                                    </td>
                                    <td id="TD_325">
                                        헬스케어플랫폼센터
                                    </td>
                                    <td id="TD_326">
                                        <ul id="UL_327" className='ms-5'>
                                            <li >
                                                - 전화번호 : 031-920-1636
                                            </li>
                                            <li >
                                                - 이메일: gsgsbal@ncc.re.kr
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr id="TR_330">
                                    <td id="TD_331">
                                        국립암센터 개인정보보호 담당
                                    </td>
                                    <td id="TD_332">
                                        이동역
                                    </td>
                                    <td id="TD_333">
                                        헬스케어플랫폼센터
                                    </td>
                                    <td id="TD_334">
                                        <ul id="UL_335">
                                            <li id="LI_336">
                                                - 전화번호 : 031-920-0642
                                            </li>
                                            <li id="LI_337">
                                                - 이메일: inverse76@ncc.re.kr
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr id="TR_338">
                                    <td id="TD_339">
                                        국가암데이터센터 개인정보보호 책임자
                                    </td>
                                    <td id="TD_340">
                                        차효성
                                    </td>
                                    <td id="TD_341">
                                        암빅데이터센터
                                    </td>
                                    <td id="TD_342">
                                        <ul id="UL_343">
                                            <li id="LI_344">
                                                - 전화번호 : 031-920-1892
                                            </li>
                                            <li id="LI_345">
                                                - 이메일: kkido@ncc.re.kr
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr id="TR_346">
                                    <td id="TD_347">
                                        국가암데이터센터 개인정보보호 담당
                                    </td>
                                    <td id="TD_348">
                                        오세희
                                    </td>
                                    <td id="TD_349">
                                        암빅데이터센터
                                    </td>
                                    <td id="TD_350">
                                        <ul id="UL_351">
                                            <li id="LI_352">
                                                - 전화번호 : 031-920-1891
                                            </li>
                                            <li id="LI_353">
                                                - 이메일: evolution@ncc.re.kr
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p>② 국가암데이터센터 데이터결합시스템서비스(또는 사업)를 이용하시면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을
                            국가암데이터센터(NCDC) 개인정보보호 담당, 개인정보 보호책임자 및 실무담당자 에게 문의하실 수 있습니다. 국가암데이터센터는 정보주체의 문의에 대해 지체 없이 답변 및
                            처리해드릴 것입니다.</p>
                    </div>

                    {/* 10 */}
                    <h5 className='flex m-5'>
                        <span id="SPAN_355">제10조 (개인정보 처리방침의 변경)</span><img
                            src={Purposeofpersonalinformationprocessing}
                            alt='개인정보처리목적'
                            id="IMG_356" />
                    </h5>
                    <div id="DIV_357">
                        <p>이 개인정보 처리방침은 2022. 9. 30부터 적용됩니다. 이전의 개인정보 처리방침은 아래에서 확인할 수 있습니다.</p>
                    </div>
                </div>

            </div>
        </div>


    )
}

export default Koreanprivacyact;





