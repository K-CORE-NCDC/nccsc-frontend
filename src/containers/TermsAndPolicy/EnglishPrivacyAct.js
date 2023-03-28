

import React from 'react'

import '../../styles/koreanprivacy.css'
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
import Attachments from '../../assets/Attachment.hwp'


function EnglishPrivacyAct() {
  return (
    <div>
      <div id="DIV_2" className='m-14'>
        <div id="DIV_52">
          <h4 id="H4_62">
            K-CORE Portal Privacy Policy
          </h4>
          <p id="P_63" >
            In order to protect the personal information of information subjects in accordance with Article 30 of the “Personal Information Protection Act” of the K-CORE portal operated within the National Cancer Center National Cancer Data Center, and to promptly and smoothly handle related grievances, as follows: Establishes and discloses a personal information processing policy.
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

          <div className='text-center mb-5'>[Primary personal information processing indication (labeling)]</div>
            <div className='grid grid-cols-6 grid-rows-3 mr-16'>
              <div className='grid justify-items-center'>
                <img src={RightsandObligationsofDataSubjects}
                  alt="RightsandObligationsofDataSubjects" id="IMG_82" className='m-2' />
                <span id="SPAN_83" className='m-2'>Information subject's rights and obligations</span>
              </div>
              <div className='grid justify-items-center'>
                <img src={requestforreading}
                  alt="requestforreading" id="IMG_82" />
                <span id="SPAN_83">Request for reading
                </span>
              </div>
              <div className='grid justify-items-center'>
                <img src={RemediesforInfringementofRights}
                  alt="RemediesforInfringementofRights" id="IMG_82" />
                <span id="SPAN_83">Remedies for Infringement of Rights</span>
              </div>
              <div className='grid justify-items-center'>
                <img src={Purposeofpersonalinformationprocessing}
                  alt="Purposeofpersonalinformationprocessing" id="IMG_82" />
                <span id="SPAN_83">Purpose of Personal information processing</span>
              </div>
              <div className='grid justify-items-center'>
                <img src={Provisionofpersonalinformation}
                  alt="Provisionofpersonalinformation 제공" id="IMG_82" />
                <span id="SPAN_83">Provision of Personal information</span>
              </div>
              <div className='grid justify-items-center'>
                <img src={Processingitems}
                  alt="Processingitems" id="IMG_82" />
                <span id="SPAN_83">Processing Items</span>
              </div>
              <div className='grid justify-items-center'>
                <img src={processingconsignment}
                  alt="processingconsignment " id="IMG_82" />
                <span id="SPAN_83">Processing Consignment</span>
              </div>
              <div className='grid justify-items-center'>
                <img src={PersonalInformatonProtectionOfficer}
                  alt="PersonalInformatonProtectionOfficer" id="IMG_82" />
                <span id="SPAN_83">Personal informaton Protection Officer</span>
              </div>
              <div className='grid justify-items-center'>
                <img src={Personalinformationprocessing}
                  alt="Personalinformationprocessing" id="IMG_82" />
                <span id="SPAN_83">Personal information Processing</span>
              </div>
              <div className='grid justify-items-center'>
                <img src={Measurestoensuresafety}
                  alt="Measurestoensuresafety" id="IMG_82" />
                <span id="SPAN_83">Measures to ensure Safety</span>
              </div>
              <div className='grid justify-items-center'>
                <img src={GrievanceHandlingDepartment}
                  alt="GrievanceHandlingDepartment" id="IMG_82" />
                <span id="SPAN_83">Grievance Handling Department</span>
              </div>
              <div className='grid justify-items-center'>
                <img src={Generalpersonaliformationcollection}
                  alt="Generalpersonaliformationcollection" id="IMG_82" />
                <span id="SPAN_83">General Personal information Collection</span>
              </div>
            </div>
          </div>
          <div id='DIV_94'>
            <div id='' style={{ marginLeft: "200px" }}>
              <table class="ktable" style={{ width: "141rem" ,marginLeft: '-200px'}} >
                <thead className='kth'>
                  <tr>
                    <th className='kth'>Index</th>
                    <th className='kth'>
                      Name</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='ktd'>Article 1 </td>
                    <td className='ktd'>Purpose of personal information processing, processing items, retention period</td>

                  </tr>
                  <tr className='text-right'>
                    <td className='ktd'>Article 2</td>
                    <td className='ktd'>Automatically collect personal information such as Internet access information files </td>
                  </tr>
                  <tr>
                    <td className='ktd'>Article 3 </td>
                    <td className='ktd'>
                      Procedure and method of destruction of personal information</td>

                  </tr>
                  <tr>
                    <td className='ktd'>Article 4</td>
                    <td className='ktd'>Matters concerning entrustment of personal information processing</td>

                  </tr>
                  <tr>
                    <td className='ktd'>Article 5 </td>
                    <td className='ktd'> 
Measures to ensure the safety of personal information</td>

                  </tr>
                  <tr>
                    <td className='ktd'>Article 6</td>
                    <td className='ktd'> Rights and Obligations of Information Subjects and Legal Representatives and Laws for Exercising them</td>

                  </tr>
                  <tr>
                    <td className='ktd'>Article 7</td>
                    <td className='ktd'> Department that receives and handles requests for access to personal information</td>

                  </tr>
                  <tr>
                    <td className='ktd'>Article 8</td>
                    <td className='ktd'> Remedies for Infringement of Rights</td>

                  </tr>
                  <tr>
                    <td className='ktd'>Article 9</td>
                    <td className='ktd'> Personal information protection officer and person in charge contact information</td>

                  </tr>
                  <tr>
                    <td className='ktd'>Article 10</td>
                    <td className='ktd'> Changes to the Privacy Policy</td>

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
            <span id="SPAN_128">Article 1 Purpose of personal information processing, processing items, retention period  </span>
            <img
              src={Generalpersonaliformationcollection} alt="Generalpersonaliformationcollection"
              id="IMG_129" />
            <img src={Purposeofpersonalinformationprocessing}
              alt="Purposeofpersonalinformationprocessing" id="IMG_130" />
            <img src={Processingitems} alt="Processingitems"
              id="IMG_131" />
            <img src={Personalinformationprocessing}
              alt="Personalinformationprocessing" id="IMG_132" />
          </h5>

          <div id="DIV_134" className='m-5'>
            ①	Personal information processed by the National Cancer Center (National Cancer Data Center) K-CORE is processed in accordance with Article 15 (collection and use of personal information) of the 「Personal Information Protection Act」 in compliance with the personal information protection regulations of the relevant laws.<br id="BR_135" />
            <table id="TABLE_136">

              {/* <caption id="CAPTION_137">
              Status of application for export, 테이블이며, 순서, KISA신청번호, 반출신청번호, 신청일자 ,신청자, 진행상태, 비고 항목으로 구성
              </caption> */}

              <colgroup id="COLGROUP_138">
                <col id="COL_139" />
                <col id="COL_141" />
                <col id="COL_141" />
                <col id="COL_141" />
              </colgroup>
              <tbody id="TBODY_142">
                <tr id="TR_143">
                  <th id="TH_144">
                    Category
                  </th>
                  <th id="TH_144" >
                    Purpose of processing and related grounds

                  </th>
                  <th id="TH_144">
                    Personal information items
                  </th>
                  <th id="TH_144">
                    Retention period
                  </th>
                </tr>
                <tr id="TR_147">
                  <td id="TD_148">
                    K-CORE portal Member profile
                  </td>
                  <td id="TD_148">
                    Article 15 Paragraph 1 of
                    <br id="BR_156" />
                    Personal Information Protection Act
                  </td>
                  <td id="TD_154">
                    ID, password, applicant information (name, contact information, email), affiliation information (government (public) institution, university, research institute, medical institution, industry, etc.), access information
                  </td>
                  <td id="TD_154">
                    2 years
                    (Delete immediately upon withdrawal from membership)

                  </td>
                </tr>
              </tbody>
            </table><br id="BR_155" />②	The personal information-related laws handled by National Cancer Center (National Cancer Data Center) K-CORE are governed by Article 9-2 of the Cancer Control Act (cancer data business) and Article 15, Paragraph 1, Item 2 of the Personal Information Protection Act (collection and use of personal information), and Article 28-2 (Processing of pseudonymous information, etc.) of the 「Personal Information Protection Act」. They are processed in compliance with the personal information protection regulations.<br id="BR_156" />
            ③	The personal information operated by the National Cancer Center (National Cancer Data Center) K-CORE does not include information that can be used to identify a specific individual, and if that information is generated, it will be withdrawn and get destroyed without delay
          </div>

          <h5 id="" className='flex m-5'>
            <span id="SPAN_158">Article 2 (Matters of Installation and operation of devices that automatically collect personal information, such as Internet access information files, and rejection of collecting personal information) </span><img
              src={automatedcollection} alt="자동화 수집"
              id="IMG_159" />
          </h5>

          <div id="DIV_160">
            ① In the course of using the service at the National Cancer Center (National Cancer Data Center) K-CORE, service use records such as IP address, cookies, and visit date/time/bad use records may be created and collected. <br
              id="BR_161" />
            ② In the process of using the service, information about the user is created and stored (collected) in an automated way, or the unique information of the user's device is safely converted so that the original value cannot be checked and then collected. <br id="BR_161" />
            ③ To install, operate, and reject cookies, you can refuse to save cookies by setting options in the Tools {'>'} Internet Options {'>'} Personal Information menu at the top of the web browser.<br id="BR_163" />
            ④	If you refuse to store cookies, you may experience difficulties in using the web service.
          </div>

          <h5 id="" className='flex my-5'>
            <span id="SPAN_165"> Article 3 (Procedures and Methods for Destruction of Personal Information) </span><img
              src={Provisionofpersonalinformation} alt="개인정보의 제공" id="IMG_166" />
          </h5>

          <div id="DIV_167">
            ① National Cancer Center (National Cancer Data Center) K-CORE destroys personal information without delay when the purpose of processing personal information is achieved
            <br id="BR_168" />② The destruction procedure, deadline, and method are as follows.
            <ul className='m-5'>
              <li>

                <h2>1. Destruction procedure </h2>
                <ul>
                  <li>   - When the retention period of personal information has elapsed or the personal information becomes unnecessary, such as when the purpose of use of personal information is achieved, it is stored for a certain period or immediately destroyed in accordance with the internal policy and related laws.</li>
                </ul>
              </li>
              <li>
                <h2>2. Destruction method </h2>
                <ul>
                  <li>- Personal information stored in electronic file format is deleted using a technical method that cannot reproduce the record.</li>
                </ul>
              </li>
            </ul>
          </div>

          <h5 className='flex m-5'>
            <span id="SPAN_187">Article 4 (Matters related to the entrustment of personal information processing) </span><img
              src={processingconsignment} alt="처리위탁" id="IMG_188" />
          </h5>

          <div id="DIV_189_English">
            <p className='mb-2'>① National Cancer Center (National Cancer Data Center) K-CORE entrusts the following personal information processing tasks to contractors in accordance with Article 26 of the Personal Information Protection Act (Restrictions on processing personal information according to business entrustment).</p>
            <table id="TABLE_191">

              <tbody id="TBODY_199" >
                <tr id="TR_200">
                  <th id="TH_201">
                    consignment company
                  </th>
                  <th id="TH_202">
                    consignment contents
                  </th>
                  <th id="TH_203">
                    consignment personal information
                  </th>
                  <th id="TH_204">
                    Consignment period
                  </th>
                  <th id="TH_205">
                    Result
                  </th>
                </tr>
                <tr id="TR_206">
                  <td id="TD_207">
                    3BIGS Co., Ltd
                  </td>
                  <td id="TD_208">
                    K-CORE business maintenance
                  </td>
                  <td id="TD_209">
                    Member registration information (name, contact information, email, affiliation information)
                  </td>
                  <td id="TD_210">
                    Until the end of the consignment contract
                  </td>
                  <td id="TD_211">
                    Good
                  </td>
                </tr>
                <tr id="TR_212">
                  <td id="TD_213">
                    NICE Information Service Co., Ltd
                  </td>
                  <td id="TD_214">
                    Authentication when registering as a member
                  </td>
                  <td id="TD_215">
                    NICE Information Service Co., Ltd.	Authentication when registering as a member	Member authentication information (name, contact information, telecommunication company, first 7 digits of resident number)	Until the end of the consignment contract	Good
                  </td>
                  <td id="TD_216">
                    Until the end of the consignment contract
                  </td>
                  <td id="TD_217">
                    Good
                  </td>
                </tr>
              </tbody>
            </table>

            <p> ② National Cancer Center (National Cancer Data Center) K-CORE handles the restrictions on the processing of personal information pursuant to paragraph ① in accordance with the following documents.</p>  <br
              id="BR_218" />
            <ul className='m-4'>
              <li >
                - Matters concerning the prohibition of processing of personal information other than for the purpose of performing entrusted work
              </li>
              <li >
                - Matters concerning the safety management of personal (pseudonym) information
              </li>
              <li >
                - Matters concerning administrative and technical protection measures for personal (pseudonym) information
              </li>
              <li >
                - Matters related to supervision, such as the purpose and scope of entrusted work, restrictions on re-entrustment, measures to ensure the safety of personal (pseudonym) information, and inspection of the management status of personal (pseudonym) information held in connection with entrusted work; Matters concerning liability for damages in case of breach of obligations to be observed by the trustee
              </li>
              <li >
                - Matters concerning the prohibition of re-identification and notification when a risk of re-identification occurs
              </li>
            </ul> ③ If the contents of the consignment work or the consignee are changed, we will disclose it through this personal information processing policy without delay.<br id="BR_225" />
          </div>

          <h5 className='flex m-5'>
            <span id="SPAN_227">Article 5 (Measures to ensure the safety of personal information) </span><img
              src={Measurestoensuresafety} alt="안전성확보조치" id="IMG_228" />
          </h5>
          <div id="DIV_229">
            ① National Cancer Center (National Cancer Data Center) K-CORE is taking technical, administrative, and physical measures to ensure the safety of personal information in accordance with Article 29 (Obligation of Safety Measures) of the 「Personal Information Protection Act」.<br
              id="BR_230" />
            <ul className='m-4'>
              <li >
                1. Administrative Protection Measures: The National Cancer Center establishes and implements an internal management plan that includes the following through the 「Basic Guidelines for Personal Information Protection」 and the Comprehensive Personal Information Protection Plan.
              </li>
              <ul className='m-4'>
                <li >
                  - Matters related to education of personal information handlers and pseudonymous information handlers
                </li>
                <li >
                  - Matters concerning the designation of the person in charge of personal information protection</li>
                <li >
                  - Matters concerning the roles and responsibilities of the personal information protection officer and personal information handler                 </li>
                <li >
                  - Matters concerning the organization and operation of the personal information protection organization
                </li>
                <li >
                  - Matters concerning the establishment and implementation of a personal information leakage incident response plan                     </li>
              </ul>
              <li >
                2. Technical protection measures
              </li>
              <ul className='m-4'>
                <li >
                  - Matters related to access right management
                </li>
                <li >
                  - Matters related to access control
                </li>
                <li >
                  - Matters concerning encryption measures for personal information
                </li>
                <li>
                  - Matters concerning the storage and inspection of access records
                </li>
                <li>
                  - Matters related to the prevention of malicious programs, etc.
                </li>
              </ul>
              <li >
                3. Physical Protection Measures                           </li>
              <ul>
                <li className='m-4'>

                  - Matters concerning physical safety measures
                </li>
              </ul>
            </ul>

          </div>


          <h5 className='flex m-5'>
            <span id="SPAN_227">Article 6 (Rights and Duties of Information Subjects and Legal Representatives and Act on Exercising them)</span><img
              src={Measurestoensuresafety} alt="안전성확보조치" id="IMG_228" />
          </h5>
          <div id="DIV_229_English" className='ms-4'>                  <br
            id="BR_230" />
            <ul className='m-4'>
              <li>① The information subject can exercise the following rights.</li>
              <li >
                1. Request to view personal information: You may request to view the personal information files you have in accordance with Article 35 (Access to Personal Information) of the 「Personal Information Protection Act」. However, the request for access to personal information may be restricted as follows according to Article 35 (5) of the Act.
              </li>
              <ul className='m-4'>
                <li >
                  - When reading is prohibited or restricted by law
                  <ul>
                    <li>- If there is a risk of harming the life or body of another person or unfairly infringing on the property and other interests of another person</li>
                    <li>If a public institution causes a significant impediment in performing any of the following tasks
                      <ul>
                        <li>A. Business related to the imposition, collection or refund of tax</li>
                        <li>B. Businesses related to the evaluation of grades or selection of admitted students at schools at each level under the Elementary and Secondary Education Act and the Higher Education Act, lifelong education facilities under the Lifelong Education Act, and other higher education institutions established under other Acts</li>
                        <li>C. Tests related to academic background, skills, and recruitment, and work related to qualification screening</li>
                        <li>D. Tasks related to the evaluation or judgment in progress regarding the calculation of compensation and benefits, etc.</li>
                        <li>E. Tasks related to ongoing audits and investigations under other laws</li>
                      </ul>
                    </li>
                  </ul>
                </li>

              </ul>
              <li >
                2. Request for correction/deletion of personal information: You can request correction/deletion of the personal information file you have in accordance with Article 36 (Correction and deletion of personal information) of the 「Personal Information Protection Act」. However, if the personal information is specified as a collection target in other laws, the deletion cannot be requested.
              </li>

              <li >
                3. Request to suspend processing of personal information: You can request to suspend processing of personal information files you have in accordance with Article 37 of the 「Personal Information Protection Act」 (Stop processing of personal information, etc.). However, in the case of a request to suspend the processing of personal information, the request for suspension of processing may be rejected in accordance with Article 37 (2) of the Act.</li>
              <ul className='m-4'>
                <li >

                  - If there are special provisions in the law or it is unavoidable to comply with the statutory obligations
                </li>
                <li>- If there is a risk of harming the life or body of another person or unfairly infringing on the property and other interests of another person</li>
                <li>- If a public institution is unable to carry out its duties as stipulated in other laws without processing personal information</li>
                <li>- If it is difficult to fulfill the contract, such as not being able to provide the service agreed upon with the data subject if personal information is not processed, and the data subject does not clearly indicate his/her intention to terminate the contract</li>
              </ul>
            </ul>

          </div>



          {/* 7 */}

          <h5 className='flex m-5'>
            <span id="SPAN_286">Article 7 (Department that receives and processes requests for access to personal information) </span>
            <img
              src={RemediesforInfringementofRights} alt="권익침해구제" id="IMG_287" />
          </h5>
          <div id="DIV_288_English">
            ① The information subject may make a request for access to personal information pursuant to Article 35 of the Personal Information Protection Act to the following departments. We will promptly process the personal information access request of the information subject.<br id="BR_289" />
            <ul className='m-5'>
              <li >
                - Department Name: Data Operation Team              </li>
              <li >
                - Person in charge: Oh Se-hee
              </li>
              <li >
                - Contact: +82-31-920-1891 (phone number), evolution@ncc.re.kr (e-mail)
              </li>
              <li >
                <a href={Attachments} download className='text-blue-300'>☞ Personal_information_access_correction_deletion_request_form download [Attachment 1]</a>
              </li>
            </ul>
            <span id="SPAN_284">
            </span>
          </div>

          {/* 8 */}

          <h5 className=' flex m-5'>
            <span id="SPAN_301">Article 8 (Remedies for Infringement of Rights) </span>
            <img
              src={RemediesforInfringementofRights} alt="권익침해구제" id="IMG_287" />
          </h5>
          <div id="DIV_302_English">
            <p>① The information subject may apply for dispute resolution or consultation to the Personal Information Dispute Mediation Committee, the Korea Internet & Security Agency Personal Information Infringement Report Center, etc.</p>
            <ul className='m-5'>
              <li>- Personal Information Dispute Mediation Committee: 1833-6972 (http://www.kopico.go.kr)</li>
              <li>- Personal Information Infringement Report Center: 118 (http://privacy.kisa.or.kr)</li>
              <li>- Cyber Investigation Division, Supreme Prosecutors' Office: 1301 (http://www.spo.go.kr)</li>
              <li>  - National Police Agency Cyber Security Bureau: 182 (http://cyberbureau.police.go.kr)</li>
            </ul>

            <p>② Rights or benefits due to the disposition or omission of the head of a public institution in response to the request of the information subject pursuant to Article 35 (Perusal of Personal Information) and Article 37 (Suspension of Processing of Personal Information, etc.) of the 「Personal Information Protection Act」 Information subjects who have been infringed on can file an administrative appeal as stipulated by the Administrative Appeals Act.</p>
            <p>※ For more information on administrative appeals, please refer to the website of the Administrative Appeals Committee (http://www.simpan.go.kr). </p>
          </div>

          {/* 9 */}


          <h5 className='flex m-5'>
            <span id="SPAN_305">Article 9 (Contact information for the person in charge of personal information protection and the person in charge) </span><img
              src={PersonalInformatonProtectionOfficer} alt="개인정보보호책임자" id="IMG_306" />
          </h5>
          <div id="DIV_307" className='m-5'>
            ①	In order to protect personal information and handle complaints about related grievances, the person in charge of personal information protection and working person are designated as follows.<br id="BR_308" />
            <table id="TABLE_309">

              <tbody id="TBODY_316">
                <tr id="TR_317">
                  <th id="TH_318">
                    Category
                  </th>
                  <th id="TH_319">
                    Person in charge
                  </th>
                  <th id="TH_320">
                    Department
                  </th>
                  <th id="TH_321">
                    Contact information
                  </th>
                </tr>
                <tr id="TR_322">
                  <td id="TD_323">
                    <ul>
                      <li>
                      National Cancer Center
                      </li>
                      <li>
                        Personal Information Protection, responsible
                      </li>
                    </ul>
                  </td>
                  <td id="TD_324">
                    Sohn Dae-Kyung
                  </td>
                  <td id="TD_325">
                    Healthcare Platform Center
                  </td>
                  <td id="TD_326">
                    <ul id="UL_327" >
                      <li style={{marginLeft:'41px'}}>
                        - Phone number: +82-31-920-1636
                      </li>
                      <li >
                        - Email: gsgsbal@ncc.re.kr
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr id="TR_330">
                  <td id="TD_331">
                    <ul>
                      <li>
                        National Cancer Center
                      </li>
                      <li>
                        Personal Information Protection, in charge
                      </li>
                    </ul>
                  </td>
                  <td id="TD_332">
                    Lee dong- youk
                  </td>
                  <td id="TD_333">
                    Healthcare Platform Center
                  </td>
                  <td id="TD_334">
                    <ul id="UL_335">
                      <li id="LI_336">
                        - Phone number: +82-31-920-0642
                      </li>
                      <li id="LI_337" style={{marginLeft:'-15px'}}>
                        - Email: inverse76@ncc.re.kr
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr id="TR_338">
                  <td id="TD_339">
                    <ul id="UL_327" className='ms-5'>
                      <li >
                        National Cancer Data Center (NCDC)
                      </li>
                      <li >
                        Personal Information Protection, responsible
                      </li>
                    </ul>
                  </td>
                  <td id="TD_340">
                    Cha Hyo-Soung
                  </td>
                  <td id="TD_341">
                    Cancer Data Center
                  </td>
                  <td id="TD_342">
                    <ul id="UL_343">
                      <li id="LI_344">
                        - Phone number: +82-31-920-1892
                      </li>
                      <li id="LI_345" style={{marginLeft:'-25px'}}>
                        - Email: kkido@ncc.re.kr
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr id="TR_346">
                  <td id="TD_347">
                    <ul id="UL_343" style={{marginLeft: '-20px'}}>
                      <li id="LI_344">
                        National Cancer Data Center (NCDC)
                      </li>
                      <li id="LI_345">
                        Personal information protection, in charge
                      </li>
                    </ul>
                  </td>
                  <td id="TD_348">
                  Kim Do-Yeop
                  </td>
                  <td id="TD_349">
                    Cancer Data Center
                  </td>
                  <td id="TD_350">
                    <ul id="UL_351">
                      <li id="LI_352">
                        - Phone number: +82-31-920-0774
                      </li>
                      <li id="LI_353" style={{marginLeft:'-25px'}}>
                        - Email: kimdy@ncc.re.kr
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>②	National Cancer Center (National Cancer Data Center) Send all personal information protection related inquiries, complaint handling, damage relief, etc. that occurred while using K-CORE to the person in charge of personal information protection, personal information protection officer, and working person at the National Cancer Data Center You can contact us. We will respond and handle inquiries from the information subject without delay.</p>
          </div>

          {/* 10 */}
          <h5 className='flex m-5'>
            <span id="SPAN_355">Article 10 (Change of Privacy Policy) </span><img
              src={Purposeofpersonalinformationprocessing}
              alt='개인정보처리목적'
              id="IMG_356" />
          </h5>
          <div id="DIV_357">
            <p>①	 This personal information processing policy will be applied from September 30, 2022.</p>
          </div>
        </div>

      </div>
    </div>


  )
}

export default EnglishPrivacyAct;