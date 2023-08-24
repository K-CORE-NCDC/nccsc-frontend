import React from 'react';
import '../../styles/koreanprivacy.css';
import automatedcollection from '../../assets/images/PrivacyACTImages/automatedcollection.png';
import Generalpersonaliformationcollection from '../../assets/images/PrivacyACTImages/Generalpersonaliformationcollection.png';
import GrievanceHandlingDepartment from '../../assets/images/PrivacyACTImages/GrievanceHandlingDepartment.png';
import Measurestoensuresafety from '../../assets/images/PrivacyACTImages/Measurestoensuresafety.png';
import Personalinformationprocessing from '../../assets/images/PrivacyACTImages/Personalinformationprocessing.png';
import PersonalInformatonProtectionOfficer from '../../assets/images/PrivacyACTImages/PersonalInformatonProtectionOfficer.png';
import processingconsignment from '../../assets/images/PrivacyACTImages/processingconsignment.png';
import Processingitems from '../../assets/images/PrivacyACTImages/Processingitems.png';
import Provisionofpersonalinformation from '../../assets/images/PrivacyACTImages/Provisionofpersonalinformation.png';
import Purposeofpersonalinformationprocessing from '../../assets/images/PrivacyACTImages/Purposeofpersonalinformationprocessing.png';
import RemediesforInfringementofRights from '../../assets/images/PrivacyACTImages/RemediesforInfringementofRights.png';
import requestforreading from '../../assets/images/PrivacyACTImages/requestforreading.png';
import RightsandObligationsofDataSubjects from '../../assets/images/PrivacyACTImages/RightsandObligationsofDataSubjects.png';
import Attachments from '../../assets/files/Attachment.hwp';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';

function EnglishPrivacyAct() {
  const title = { id: 'PrivacyPolicy', defaultMessage: 'PrivacyPolicy' };

  const breadCrumbs = {
    '/privacypolicy/': [
      { id: 'PrivacyPolicy', defaultMessage: 'PrivacyPolicy', to: '/privacypolicy/' }
    ]
  };
  return (
    <>
      <HeaderComponent title={title} breadCrumbs={breadCrumbs['/privacypolicy/']} type="single" />

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
                <div id="DIV_2" className="">
                  <div id="DIV_52">
                    <h4 id="H4_62">K-CORE Portal Privacy Policy</h4>
                    <p className="MarginTop10">
                      In order to protect the personal information of information subjects in
                      accordance with Article 30 of the “Personal Information Protection Act” of the
                      K-CORE portal operated within the National Cancer Center National Cancer Data
                      Center, and to promptly and smoothly handle related grievances, as follows:
                      Establishes and discloses a personal information processing policy.
                    </p>
                    <div className="div_64">
                      <div className="div_64_1">
                        [Primary personal information processing indication (labeling)]
                      </div>
                      <div className="div_64_box">
                        <div className="div_64_box_div">
                          <img
                            src={RightsandObligationsofDataSubjects}
                            alt="RightsandObligationsofDataSubjects"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">
                            Information subject's rights and obligations
                          </span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={requestforreading}
                            alt="requestforreading"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">Request for reading</span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={RemediesforInfringementofRights}
                            alt="RemediesforInfringementofRights"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">
                            Remedies for Infringement of Rights
                          </span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={Purposeofpersonalinformationprocessing}
                            alt="Purposeofpersonalinformationprocessing"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">
                            Purpose of Personal information processing
                          </span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={Provisionofpersonalinformation}
                            alt="Provisionofpersonalinformation 제공"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">Provision of Personal information</span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={Processingitems}
                            alt="Processingitems"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">Processing Items</span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={processingconsignment}
                            alt="processingconsignment "
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">Processing Consignment</span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={PersonalInformatonProtectionOfficer}
                            alt="PersonalInformatonProtectionOfficer"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">
                            Personal informaton Protection Officer
                          </span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={Personalinformationprocessing}
                            alt="Personalinformationprocessing"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">Personal information Processing</span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={Measurestoensuresafety}
                            alt="Measurestoensuresafety"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">Measures to ensure Safety</span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={GrievanceHandlingDepartment}
                            alt="GrievanceHandlingDepartment"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">Grievance Handling Department</span>
                        </div>
                        <div className="div_64_box_div">
                          <img
                            src={Generalpersonaliformationcollection}
                            alt="Generalpersonaliformationcollection"
                            id="IMG_82"
                            className="div_64_box_img"
                          />
                          <span className="div_64_box_text">
                            General Personal information Collection
                          </span>
                        </div>
                      </div>
                      {/* <div></div> */}
                    </div>
                    <div className="" style={{ marginTop: '5%' }}>
                      <div>
                        <table className="ktable">
                          <thead className="kth">
                            <tr>
                              <th className="kth">Index</th>
                              <th className="kth ">Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="ktd">Article 1 </td>
                              <td className="ktd">
                                Purpose of personal information processing, processing items,
                                retention period
                              </td>
                            </tr>
                            <tr className="">
                              <td className="ktd">Article 2</td>
                              <td className="ktd">
                                Automatically collect personal information such as Internet access
                                information files{' '}
                              </td>
                            </tr>
                            <tr>
                              <td className="ktd">Article 3 </td>
                              <td className="ktd">
                                Procedure and method of destruction of personal information
                              </td>
                            </tr>
                            <tr>
                              <td className="ktd">Article 4</td>
                              <td className="ktd">
                                Matters concerning entrustment of personal information processing
                              </td>
                            </tr>
                            <tr>
                              <td className="ktd">Article 5 </td>
                              <td className="ktd">
                                Measures to ensure the safety of personal information
                              </td>
                            </tr>
                            <tr>
                              <td className="ktd">Article 6</td>
                              <td className="ktd">
                                {' '}
                                Rights and Obligations of Information Subjects and Legal
                                Representatives and Laws for Exercising them
                              </td>
                            </tr>
                            <tr>
                              <td className="ktd">Article 7</td>
                              <td className="ktd">
                                {' '}
                                Department that receives and handles requests for access to personal
                                information
                              </td>
                            </tr>
                            <tr>
                              <td className="ktd">Article 8</td>
                              <td className="ktd"> Remedies for Infringement of Rights</td>
                            </tr>
                            <tr>
                              <td className="ktd">Article 9</td>
                              <td className="ktd">
                                {' '}
                                Personal information protection officer and person in charge contact
                                information
                              </td>
                            </tr>
                            <tr>
                              <td className="ktd">Article 10</td>
                              <td className="ktd"> Changes to the Privacy Policy</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <h5 className="">
                      <span id="SPAN_128">
                        Article 1 Purpose of personal information processing, processing items,
                        retention period{' '}
                      </span>
                      <img
                        src={Generalpersonaliformationcollection}
                        alt="Generalpersonaliformationcollection"
                        id="IMG_129"
                      />
                      <img
                        src={Purposeofpersonalinformationprocessing}
                        alt="Purposeofpersonalinformationprocessing"
                        id="IMG_130"
                      />
                      <img src={Processingitems} alt="Processingitems" id="IMG_131" />
                      <img
                        src={Personalinformationprocessing}
                        alt="Personalinformationprocessing"
                        id="IMG_132"
                      />
                    </h5>

                    <div className="div_64 MarginTop10" style={{ padding: '2%' }}>
                      <span>
                        ① Personal information processed by the National Cancer Center (National
                        Cancer Data Center) K-CORE is processed in accordance with Article 15
                        (collection and use of personal information) of the 「Personal Information
                        Protection Act」 in compliance with the personal information protection
                        regulations of the relevant laws.
                      </span>
                      <div className="MarginTop10">
                        <table className="ktable">
                          {/* <colgroup id="COLGROUP_138">
                          <col id="COL_139" />
                          <col id="COL_141" />
                          <col id="COL_141" />
                          <col id="COL_141" />
                        </colgroup> */}
                          <tbody>
                            <tr>
                              <th className="kth">Category</th>
                              <th className="kth">Purpose of processing and related grounds</th>
                              <th className="kth">Personal information items</th>
                              <th className="kth">Retention period</th>
                            </tr>
                            <tr>
                              <td className="ktd">K-CORE portal Member profile</td>
                              <td className="ktd">
                                Article 15 Paragraph 1 of
                                <br />
                                Personal Information Protection Act
                              </td>
                              <td className="ktd">
                                ID, password, applicant information (name, contact information,
                                email), affiliation information (government (public) institution,
                                university, research institute, medical institution, industry,
                                etc.), access information
                              </td>
                              <td className="ktd">
                                2 years (Delete immediately upon withdrawal from membership)
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="MarginTop10">
                        ② The personal information-related laws handled by National Cancer Center
                        (National Cancer Data Center) K-CORE are governed by Article 9-2 of the
                        Cancer Control Act (cancer data business) and Article 15, Paragraph 1, Item
                        2 of the Personal Information Protection Act (collection and use of personal
                        information), and Article 28-2 (Processing of pseudonymous information,
                        etc.) of the 「Personal Information Protection Act」. They are processed in
                        compliance with the personal information protection regulations.
                      </p>
                      <p className="MarginTop10">
                        ③ The personal information operated by the National Cancer Center (National
                        Cancer Data Center) K-CORE does not include information that can be used to
                        identify a specific individual, and if that information is generated, it
                        will be withdrawn and get destroyed without delay{' '}
                      </p>
                    </div>

                    <h5 id="" className="">
                      <span id="SPAN_158">
                        Article 2 (Matters of Installation and operation of devices that
                        automatically collect personal information, such as Internet access
                        information files, and rejection of collecting personal information){' '}
                      </span>
                      <img src={automatedcollection} alt="자동화 수집" id="IMG_159" />
                    </h5>

                    <div className="div_64" style={{ padding: '2%' }}>
                      <p className="MarginTop10">
                        ① In the course of using the service at the National Cancer Center (National
                        Cancer Data Center) K-CORE, service use records such as IP address, cookies,
                        and visit date/time/bad use records may be created and collected.{' '}
                      </p>
                      <p className="MarginTop10">
                        {' '}
                        ② In the process of using the service, information about the user is created
                        and stored (collected) in an automated way, or the unique information of the
                        user's device is safely converted so that the original value cannot be
                        checked and then collected.{' '}
                      </p>
                      <p className="MarginTop10">
                        ③ To install, operate, and reject cookies, you can refuse to save cookies by
                        setting options in the Tools {'>'} Internet Options {'>'} Personal
                        Information menu at the top of the web browser.{' '}
                      </p>
                      <p className="MarginTop10">
                        {' '}
                        ④ If you refuse to store cookies, you may experience difficulties in using
                        the web service.
                      </p>
                    </div>

                    <h5 id="" className="">
                      <span id="SPAN_165">
                        {' '}
                        Article 3 (Procedures and Methods for Destruction of Personal Information){' '}
                      </span>
                      <img
                        src={Provisionofpersonalinformation}
                        alt="개인정보의 제공"
                        id="IMG_166"
                      />
                    </h5>

                    <div className="div_64" style={{ padding: '2%' }}>
                      <p className="MarginTop10">
                        ① National Cancer Center (National Cancer Data Center) K-CORE destroys
                        personal information without delay when the purpose of processing personal
                        information is achieved{' '}
                      </p>
                      <p className="MarginTop10">
                        ② The destruction procedure, deadline, and method are as follows.
                      </p>
                      <ul className="MarginTop10">
                        <li className="MarginTop10">
                          <h2>1. Destruction procedure </h2>
                          <ul>
                            <li>
                              - When the retention period of personal information has elapsed or the
                              personal information becomes unnecessary, such as when the purpose of
                              use of personal information is achieved, it is stored for a certain
                              period or immediately destroyed in accordance with the internal policy
                              and related laws.
                            </li>
                          </ul>
                        </li>
                        <li className="MarginTop10">
                          <h2>2. Destruction method </h2>
                          <ul>
                            <li>
                              - Personal information stored in electronic file format is deleted
                              using a technical method that cannot reproduce the record.
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>

                    <h5 className="">
                      <span id="SPAN_187">
                        Article 4 (Matters related to the entrustment of personal information
                        processing){' '}
                      </span>
                      <img src={processingconsignment} alt="처리위탁" id="IMG_188" />
                    </h5>

                    <div className="div_64 " style={{ padding: '2%' }}>
                      <p className="MarginTop10">
                        ① National Cancer Center (National Cancer Data Center) K-CORE entrusts the
                        following personal information processing tasks to contractors in accordance
                        with Article 26 of the Personal Information Protection Act (Restrictions on
                        processing personal information according to business entrustment).
                      </p>

                      <div className="MarginTop10">
                        <table className="ktable">
                          <tbody>
                            <tr>
                              <th className="kth">consignment company</th>
                              <th className="kth">consignment contents</th>
                              <th className="kth">consignment personal information</th>
                              <th className="kth">Consignment period</th>
                              <th className="kth">Result</th>
                            </tr>
                            <tr>
                              <td className="ktd">3BIGS Co., Ltd</td>
                              <td className="ktd">K-CORE business maintenance</td>
                              <td className="ktd">
                                Member registration information (name, contact information, email,
                                affiliation information)
                              </td>
                              <td className="ktd">Until the end of the consignment contract</td>
                              <td className="ktd">Good</td>
                            </tr>
                            <tr>
                              <td className="ktd">NICE Information Service Co., Ltd</td>
                              <td className="ktd">Authentication when registering as a member</td>
                              <td className="ktd">
                                NICE Information Service Co., Ltd. Authentication when registering
                                as a member Member authentication information (name, contact
                                information, telecommunication company, first 7 digits of resident
                                number) Until the end of the consignment contract Good
                              </td>
                              <td className="ktd">Until the end of the consignment contract</td>
                              <td className="ktd">Good</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <p className="MarginTop10">
                        {' '}
                        ② National Cancer Center (National Cancer Data Center) K-CORE handles the
                        restrictions on the processing of personal information pursuant to paragraph
                        ① in accordance with the following documents.
                      </p>
                      <ul className="">
                        <li className="MarginTop10">
                          - Matters concerning the prohibition of processing of personal information
                          other than for the purpose of performing entrusted work
                        </li>
                        <li className="MarginTop10">
                          - Matters concerning the safety management of personal (pseudonym)
                          information
                        </li>
                        <li className="MarginTop10">
                          - Matters concerning administrative and technical protection measures for
                          personal (pseudonym) information
                        </li>
                        <li className="MarginTop10">
                          - Matters related to supervision, such as the purpose and scope of
                          entrusted work, restrictions on re-entrustment, measures to ensure the
                          safety of personal (pseudonym) information, and inspection of the
                          management status of personal (pseudonym) information held in connection
                          with entrusted work; Matters concerning liability for damages in case of
                          breach of obligations to be observed by the trustee
                        </li>
                        <li className="MarginTop10">
                          - Matters concerning the prohibition of re-identification and notification
                          when a risk of re-identification occurs
                        </li>
                      </ul>
                      <p className="MarginTop10">
                        ③ If the contents of the consignment work or the consignee are changed, we
                        will disclose it through this personal information processing policy without
                        delay.
                      </p>
                    </div>

                    <h5 className="">
                      <span id="SPAN_227">
                        Article 5 (Measures to ensure the safety of personal information){' '}
                      </span>
                      <img src={Measurestoensuresafety} alt="안전성확보조치" id="IMG_228" />
                    </h5>

                    <div className="div_64" style={{ padding: '2%' }}>
                      <p className="MarginTop10">
                        ① National Cancer Center (National Cancer Data Center) K-CORE is taking
                        technical, administrative, and physical measures to ensure the safety of
                        personal information in accordance with Article 29 (Obligation of Safety
                        Measures) of the 「Personal Information Protection Act」.
                      </p>
                      <ul>
                        <li className="MarginTop10">
                          1. Administrative Protection Measures: The National Cancer Center
                          establishes and implements an internal management plan that includes the
                          following through the 「Basic Guidelines for Personal Information
                          Protection」 and the Comprehensive Personal Information Protection Plan.
                        </li>
                        <ul>
                          <li className="MarginTop10">
                            - Matters related to education of personal information handlers and
                            pseudonymous information handlers
                          </li>
                          <li>
                            - Matters concerning the designation of the person in charge of personal
                            information protection
                          </li>
                          <li>
                            - Matters concerning the roles and responsibilities of the personal
                            information protection officer and personal information handler{' '}
                          </li>
                          <li>
                            - Matters concerning the organization and operation of the personal
                            information protection organization
                          </li>
                          <li>
                            - Matters concerning the establishment and implementation of a personal
                            information leakage incident response plan{' '}
                          </li>
                        </ul>
                        <li className="MarginTop10">2. Technical protection measures</li>
                        <ul>
                          <li className="MarginTop10">
                            - Matters related to access right management
                          </li>
                          <li>- Matters related to access control</li>
                          <li>- Matters concerning encryption measures for personal information</li>
                          <li>- Matters concerning the storage and inspection of access records</li>
                          <li>- Matters related to the prevention of malicious programs, etc.</li>
                        </ul>
                        <li className="MarginTop10">3. Physical Protection Measures </li>
                        <ul className="MarginTop10">
                          <li className="">- Matters concerning physical safety measures</li>
                        </ul>
                      </ul>
                    </div>

                    <h5 className="">
                      <span id="SPAN_227">
                        Article 6 (Rights and Duties of Information Subjects and Legal
                        Representatives and Act on Exercising them)
                      </span>
                      <img src={Measurestoensuresafety} alt="안전성확보조치" id="IMG_228" />
                    </h5>

                    <div className="div_64" style={{ padding: '2%' }}>
                      <ul className="">
                        <li>① The information subject can exercise the following rights.</li>
                        <li className="MarginTop10">
                          1. Request to view personal information: You may request to view the
                          personal information files you have in accordance with Article 35 (Access
                          to Personal Information) of the 「Personal Information Protection Act」.
                          However, the request for access to personal information may be restricted
                          as follows according to Article 35 (5) of the Act.
                        </li>
                        <ul className="">
                          <li className="MarginTop10">
                            - When reading is prohibited or restricted by law
                            <ul>
                              <li>
                                - If there is a risk of harming the life or body of another person
                                or unfairly infringing on the property and other interests of
                                another person
                              </li>
                              <li>
                                If a public institution causes a significant impediment in
                                performing any of the following tasks
                                <ul>
                                  <li>
                                    A. Business related to the imposition, collection or refund of
                                    tax
                                  </li>
                                  <li>
                                    B. Businesses related to the evaluation of grades or selection
                                    of admitted students at schools at each level under the
                                    Elementary and Secondary Education Act and the Higher Education
                                    Act, lifelong education facilities under the Lifelong Education
                                    Act, and other higher education institutions established under
                                    other Acts
                                  </li>
                                  <li>
                                    C. Tests related to academic background, skills, and
                                    recruitment, and work related to qualification screening
                                  </li>
                                  <li>
                                    D. Tasks related to the evaluation or judgment in progress
                                    regarding the calculation of compensation and benefits, etc.
                                  </li>
                                  <li>
                                    E. Tasks related to ongoing audits and investigations under
                                    other laws
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                        <li className="MarginTop10">
                          2. Request for correction/deletion of personal information: You can
                          request correction/deletion of the personal information file you have in
                          accordance with Article 36 (Correction and deletion of personal
                          information) of the 「Personal Information Protection Act」. However, if
                          the personal information is specified as a collection target in other
                          laws, the deletion cannot be requested.
                        </li>

                        <li className="MarginTop10">
                          3. Request to suspend processing of personal information: You can request
                          to suspend processing of personal information files you have in accordance
                          with Article 37 of the 「Personal Information Protection Act」 (Stop
                          processing of personal information, etc.). However, in the case of a
                          request to suspend the processing of personal information, the request for
                          suspension of processing may be rejected in accordance with Article 37 (2)
                          of the Act.
                        </li>
                        <ul className="">
                          <li className="MarginTop10">
                            - If there are special provisions in the law or it is unavoidable to
                            comply with the statutory obligations
                          </li>
                          <li>
                            - If there is a risk of harming the life or body of another person or
                            unfairly infringing on the property and other interests of another
                            person
                          </li>
                          <li>
                            - If a public institution is unable to carry out its duties as
                            stipulated in other laws without processing personal information
                          </li>
                          <li>
                            - If it is difficult to fulfill the contract, such as not being able to
                            provide the service agreed upon with the data subject if personal
                            information is not processed, and the data subject does not clearly
                            indicate his/her intention to terminate the contract
                          </li>
                        </ul>
                      </ul>
                    </div>

                    {/* 7 */}

                    <h5 className="">
                      <span id="SPAN_286">
                        Article 7 (Department that receives and processes requests for access to
                        personal information){' '}
                      </span>
                      <img src={RemediesforInfringementofRights} alt="권익침해구제" id="IMG_287" />
                    </h5>

                    <div className="div_64" style={{ padding: '2%' }}>
                      <p>
                        {' '}
                        ① The information subject may make a request for access to personal
                        information pursuant to Article 35 of the Personal Information Protection
                        Act to the following departments. We will promptly process the personal
                        information access request of the information subject.
                      </p>
                      <ul className="MarginTop10">
                        <li className="MarginTop10">- Department Name: Data Operation Team </li>
                        <li>- Person in charge: Oh Se-hee</li>
                        <li>
                          - Contact: +82-31-920-1891 (phone number), evolution@ncc.re.kr (e-mail)
                        </li>
                        <li>
                          <a href={Attachments} download style={{ color: 'cornflowerblue' }}>
                            ☞ Personal_information_access_correction_deletion_request_form download
                            [Attachment 1]
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* 8 */}

                    <h5 className="">
                      <span id="SPAN_301">Article 8 (Remedies for Infringement of Rights) </span>
                      <img src={RemediesforInfringementofRights} alt="권익침해구제" id="IMG_287" />
                    </h5>

                    <div className="div_64" style={{ padding: '2%' }}>
                      <p className="MarginTop10">
                        ① The information subject may apply for dispute resolution or consultation
                        to the Personal Information Dispute Mediation Committee, the Korea Internet
                        & Security Agency Personal Information Infringement Report Center, etc.
                      </p>
                      <ul className="MarginTop10">
                        <li>
                          - Personal Information Dispute Mediation Committee: 1833-6972
                          (http://www.kopico.go.kr)
                        </li>
                        <li>
                          - Personal Information Infringement Report Center: 118
                          (http://privacy.kisa.or.kr)
                        </li>
                        <li>
                          - Cyber Investigation Division, Supreme Prosecutors' Office: 1301
                          (http://www.spo.go.kr)
                        </li>
                        <li>
                          {' '}
                          - National Police Agency Cyber Security Bureau: 182
                          (http://cyberbureau.police.go.kr)
                        </li>
                      </ul>

                      <p className="MarginTop10">
                        ② Rights or benefits due to the disposition or omission of the head of a
                        public institution in response to the request of the information subject
                        pursuant to Article 35 (Perusal of Personal Information) and Article 37
                        (Suspension of Processing of Personal Information, etc.) of the 「Personal
                        Information Protection Act」 Information subjects who have been infringed on
                        can file an administrative appeal as stipulated by the Administrative
                        Appeals Act.
                      </p>
                      <p className="MarginTop10">
                        ※ For more information on administrative appeals, please refer to the
                        website of the Administrative Appeals Committee (http://www.simpan.go.kr).{' '}
                      </p>
                    </div>

                    {/* 9 */}

                    <h5 className="">
                      <span id="SPAN_305">
                        Article 9 (Contact information for the person in charge of personal
                        information protection and the person in charge){' '}
                      </span>
                      <img
                        src={PersonalInformatonProtectionOfficer}
                        alt="개인정보보호책임자"
                        id="IMG_306"
                      />
                    </h5>

                    <div className="div_64 MarginTop10" style={{ padding: '2%' }}>
                      ① In order to protect personal information and handle complaints about related
                      grievances, the person in charge of personal information protection and
                      working person are designated as follows.
                      <br id="BR_308" />
                      <div className="MarginTop10">
                        <table className="">
                          <tbody className="ktable">
                            <tr>
                              <th className="kth" style={{ padding: '2%' }}>
                                Category
                              </th>
                              <th className="kth">Person in charge</th>
                              <th className="kth">Department</th>
                              <th className="kth">Contact information</th>
                            </tr>
                            <tr>
                              <td className="ktd">
                                <ul>
                                  <li>National Cancer Center</li>
                                  <li>Personal Information Protection, responsible</li>
                                </ul>
                              </td>
                              <td className="ktd">Sohn Dae-Kyung</td>
                              <td className="ktd">Healthcare Platform Center</td>
                              <td className="ktd">
                                <ul>
                                  <li>- Phone number: +82-31-920-1636</li>
                                  <li>- Email: gsgsbal@ncc.re.kr</li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td className="ktd">
                                <ul>
                                  <li>National Cancer Center</li>
                                  <li>Personal Information Protection, in charge</li>
                                </ul>
                              </td>
                              <td className="ktd">Lee dong- youk</td>
                              <td className="ktd">Healthcare Platform Center</td>
                              <td className="ktd">
                                <ul>
                                  <li>- Phone number: +82-31-920-0642</li>
                                  <li>- Email: inverse76@ncc.re.kr</li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td className="ktd">
                                <ul className="ms-5">
                                  <li>National Cancer Data Center (NCDC)</li>
                                  <li>Personal Information Protection, responsible</li>
                                </ul>
                              </td>
                              <td className="ktd">Cha Hyo-Soung</td>
                              <td className="ktd">Cancer Data Center</td>
                              <td className="ktd">
                                <ul>
                                  <li>- Phone number: +82-31-920-1892</li>
                                  <li>- Email: kkido@ncc.re.kr</li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td className="ktd">
                                <ul>
                                  <li>National Cancer Data Center (NCDC)</li>
                                  <li>Personal information protection, in charge</li>
                                </ul>
                              </td>
                              <td className="ktd">Kim Do-Yeop</td>
                              <td className="ktd">Cancer Data Center</td>
                              <td className="ktd">
                                <ul>
                                  <li>- Phone number: +82-31-920-0774</li>
                                  <li>- Email: kimdy@ncc.re.kr</li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="MarginTop10">
                        ② National Cancer Center (National Cancer Data Center) Send all personal
                        information protection related inquiries, complaint handling, damage relief,
                        etc. that occurred while using K-CORE to the person in charge of personal
                        information protection, personal information protection officer, and working
                        person at the National Cancer Data Center You can contact us. We will
                        respond and handle inquiries from the information subject without delay.
                      </p>
                    </div>

                    {/* 10 */}
                    <h5 className="">
                      <span id="SPAN_355">Article 10 (Change of Privacy Policy) </span>
                      <img
                        src={Purposeofpersonalinformationprocessing}
                        alt="개인정보처리목적"
                        id="IMG_356"
                      />
                    </h5>

                    <div className="div_64" style={{ padding: '2%' }}>
                      <p>
                        ① This personal information processing policy will be applied from September
                        30, 2022.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default EnglishPrivacyAct;
