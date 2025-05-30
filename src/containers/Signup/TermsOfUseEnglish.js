import React, { useState } from 'react';
import Swal from 'sweetalert2';
const TermsOfUseEnglish = ({ changestep }) => {
  const [firstAgree, setFirstAgree] = useState(false);
  const [secondAgree, setSecondAgree] = useState(false);

  const agreeFunction = () => {
    if (firstAgree && secondAgree) {
      changestep(1);
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'Please Accept Both Membership terms and Privacy Act',
        icon: 'warning',
        confirmButtonColor: '#003177',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
        }
      });
    }
  };

  return (
    <div>
      <section className="mt- flex flex-col items-center justify-center">
        <div>
          <span className="text-6xl font-bold text-gray-800">Terms of Use</span>
        </div>
        <div className="my-8">
          <h1 className="font-medium text-3xl text-gray-800">
            Please proceed after agreeing to the terms of use.
          </h1>
        </div>
        <div
          className="overflow-auto bg-white border border-gray-400 rounded shadow-sm p-10 resize h-48"
          style={{ width: '40%' }}
        >
          <div className="scrollBox">
            <h4 className="font-medium">
              National Cancer Center (National Cancer Data Center) K-CORE Member Terms and
              Conditions
            </h4>
            <ul className="scrollList">
              <li>
                <ul>
                  <li>
                    Article 1 (Purpose)
                    <ul>
                      <li>
                        ① These terms and conditions are to stipulate basic matters such as the
                        terms and conditions of use and procedures for the use of internet-related
                        services (hereinafter referred to as “services”) provided by the K-CORE
                        internet website operated by the National Cancer Center (National Cancer
                        Data Center).{' '}
                      </li>
                      <li>
                        ② If a person who wants to become a user clicks the "Agree" button after
                        going through the prescribed procedures set by the National Cancer Center
                        (National Cancer Data Center) K-CORE, the user is deemed to agree to have
                        these terms and conditions. The rights, duties, and responsibilities of
                        users and the National Cancer Center (National Cancer Data Center) other
                        than those stipulated in these Terms and Conditions shall be governed by
                        relevant laws and commercial practices of the Republic of Korea.{' '}
                      </li>
                    </ul>
                  </li>
                  <li>
                    Article 2 (Explanation and Amendment of Terms and Conditions){' '}
                    <ul>
                      <li>
                        ① The contents of these terms and conditions, address, name of the manager,
                        name of the person in charge of personal information protection, and contact
                        information (telephone, fax, e-mail address, etc.) will be posted on the
                        first page (Privacy Policy) of the website so that users can know.{' '}
                      </li>
                      <li>
                        ② National Cancer Center (National Cancer Data Center) K-CORE may amend
                        these Terms and Conditions to the extent that it does not violate relevant
                        laws.
                      </li>
                      <li>
                        ③ In case of revising the terms and conditions, the date of application and
                        the reason for the revision shall be specified, and the current terms and
                        conditions will be announced on the initial screen of the website from 7
                        days before the effective date to the day before the effective date.{' '}
                      </li>
                      <li>
                        ④ National Cancer Center (National Cancer Data Center) K-CORE will provide
                        services to users on the condition that the user agrees to the contents of
                        this agreement. These Terms and Conditions will take precedence over
                        K-CORE's service provision and users' service use.{' '}
                      </li>
                      <li>
                        ⑤ By agreeing to these terms and conditions, you agree to regularly visit
                        the web to check the changes to the terms and conditions. The National
                        Cancer Center (National Cancer Data Center) K-CORE is not responsible for
                        any damage to users caused by not knowing the information about the changed
                        terms and conditions.{' '}
                      </li>
                      <li>
                        ⑥ If the user does not agree to the changed terms and conditions, the user
                        may request to withdraw from membership (cancellation). If users continue to
                        use the service without expressing their intention to refuse even after 7
                        days from the effective date of the changed terms and conditions, they will
                        be deemed to have agreed to the changes to the terms and conditions.{' '}
                      </li>
                    </ul>
                  </li>
                  <li>
                    Article 3 (Definition of Terms)
                    <ul>
                      <li>
                        The definitions of terms used in these terms and conditions are as follows:
                      </li>
                    </ul>
                    <ul>
                      <li>
                        ① User (Member): A person who has registered as a member by providing
                        personal information necessary for membership on the website and can use the
                        information and services of the website.{' '}
                      </li>
                      <li>
                        ② Operator: Refers to a person selected by the National Cancer Center
                        (National Cancer Data Center) K-CORE for the overall management and smooth
                        operation of the service.{' '}
                      </li>
                      <li>
                        ③ Membership registration: Refers to the act of completing the service use
                        contract by entering the relevant information in the application form
                        provided by the website and agreeing to these terms and conditions.{' '}
                      </li>
                      <li>
                        ④ Personal information: It refers to information that can identify an
                        individual through name, resident registration number, video, etc.{' '}
                      </li>
                      <li>
                        ⑤ ID: Refers to the combination of letters and numbers selected by the user
                        and given by the website for identification of the customer and the user to
                        use the service.{' '}
                      </li>
                      <li>
                        ⑥ Password: A combination of letters and numbers selected by the user to
                        verify the identity of the user and to protect his or her personal
                        information in communication.{' '}
                      </li>
                      <li>
                        ⑦ Linked site: Refers to a website connected to the homepage using a
                        hyperlink (the subject of a hyperlink includes text, still images, and
                        moving images).{' '}
                      </li>
                      <li>⑧ Cancellation: Refers to the act of ceasing membership by the user.</li>
                    </ul>
                  </li>
                  <li>
                    Article 4 (Membership){' '}
                    <ul>
                      <li>
                        ① Membership registration is set up when the user agrees to the contents of
                        these Terms of Use upon application.
                      </li>
                      <li>
                        ② Consent to these Terms of Use is indicated by clicking the 'agree' button
                        on the website during the membership registration process
                      </li>
                      <li>
                        ③ National Cancer Center (National Cancer Data Center) K-CORE may cancel
                        membership registration for any of the following:
                      </li>
                      <li>
                        1. If the applicant for membership has previously lost membership in
                        accordance with Article 5, Paragraph 2 of these Terms and Conditions
                      </li>
                      <li>2. In case of false, omission, or error in the registration details</li>

                      <li>
                        3. If it is judged that registering as a member is significantly impeded by
                        the center's technology or business performance
                      </li>
                      <li>
                        4. When an application is made to disturb the social well-being or public
                        morals
                      </li>
                      <li>
                        5. When ss using the website and performing acts prohibited by laws and
                        these terms and conditions
                      </li>
                      <li>
                        6. If the password entered is not more than 9 and less than 20 characters
                        (contain at least three character categories among the following: uppercase,
                        lowercase, numeric, or special character)
                      </li>
                      <li>
                        ④ National Cancer Center (National Cancer Data Center) K-CORE may suspend
                        the establishment of the contract of use until the cause is resolved in each
                        of the following cases.{' '}
                      </li>
                      <li>1. In case of insufficient service-related capacity </li>
                      <li>2. If there is a technical obstacle</li>
                      <li>
                        ⑤ When there is a change in the registration information, the user must
                        immediately notify the National Cancer Center (National Cancer Data Center)
                        K-CORE of the change in other ways such as modifying member information.{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 5 (Withdrawal of membership and loss of qualifications, etc.)
                    <ul>
                      <li>
                        ① A user may withdraw from membership (cancellation) at any time after
                        signing up for membership if a user does not intend to receive the Internet
                        service provided by K-CORE of the National Cancer Center (National Cancer
                        Data Center).{' '}
                      </li>
                      <li>
                        ② If the user falls under any of the following reasons, the National Cancer
                        Center (National Cancer Data Center) K-CORE may lose membership.{' '}
                      </li>
                      <li>
                        1. In case of registering false information when applying for registration
                      </li>

                      <li>
                        2. In case of threatening order, such as interfering with other users' use
                        of the service or stealing the information{' '}
                      </li>
                      <li>
                        3. In the case of selling unverified false information and other
                        unauthorized items within the National Cancer Center (National Cancer Data
                        Center) K-CORE
                      </li>
                      <li>
                        4. National Cancer Center (National Cancer Data Center) In case of use as a
                        place of propaganda for treatment or treatment that is not permitted within
                        K-CORE{' '}
                      </li>
                      <li>
                        5. In case the National Cancer Center (National Cancer Data Center)
                        interferes with the operation of the website, such as changing the
                        information provided in K-CORE{' '}
                      </li>
                      <li>
                        6. National Cancer Center (National Cancer Data Center) In case of using
                        K-CORE to conduct an act prohibited by laws and these Terms and Conditions
                        or contrary to public order and morals{' '}
                      </li>
                      <li>
                        7. In case it is judged inappropriate to continue the qualification of other
                        members{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 6 (Contents and Changes of Services)
                    <ul>
                      <li>
                        ① National Cancer Center (National Cancer Data Center) K-CORE provides the
                        following services.{' '}
                      </li>
                      <li>
                        1. National Cancer Center (National Cancer Data Center) K-CORE-related
                        business introduction{' '}
                      </li>
                      <li>
                        2. Data visualization service provided by the National Cancer Center
                        (National Cancer Data Center){' '}
                      </li>
                      <li>
                        3. National Cancer Center (National Cancer Data Center) data application
                        guide
                      </li>
                      <li> 4. User data visualization service</li>

                      <li>5. OTHER PROVIDED SERVICES</li>
                      <li>
                        ② National Cancer Center (National Cancer Data Center) K-CORE may change the
                        contents of the service provided in case of unavoidable circumstances. In
                        this case, the contents of the changed service and the date of provision
                        will be specified and announced 7 day before the effective date{' '}
                      </li>
                      <li>
                        ③ National Cancer Center (National Cancer Data Center) K-CORE shall not
                        compensate users for damages caused by changes in service contents unless
                        due to intentional or gross negligence of K-CORE of the National Cancer
                        Center (National Cancer Data Center).{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 7 (Suspension of Service){' '}
                    <ul>
                      <li>
                        ① National Cancer Center (National Cancer Data Center) K-CORE may
                        temporarily suspend the provision of services in the event of maintenance,
                        replacement, or breakdown of information and communication facilities such
                        as computers and systems, interruption of communication, or other force
                        majeure reasons.{' '}
                      </li>
                      <li>
                        ② National Cancer Center (National Cancer Data Center) K-CORE will provide
                        individual notices to users by posting in advance on the K-CORE website of
                        the National Cancer Center (National Cancer Data Center) in the case of a
                        temporary cessation of service provision due to the reasons set out in
                        Paragraph 1 above unless advance notice is not possible due to service
                        interruption or reasons beyond the control of the National Cancer Center
                        (National Cancer Data Center). Unless it is impossible to notify in advance
                        due to the interruption of the service or reasons beyond the control of the
                        National Cancer Center K-CORE (intentional, faultless disk failure, system
                        down, etc.){' '}
                      </li>
                      <li>
                        ③ National Cancer Center (National Cancer Data Center) K-CORE will not
                        compensate for damages suffered by users or third parties due to changes in
                        service contents without intention or negligence unless due to intentional
                        or gross negligence of the Center.{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 8 (Notification to Members){' '}
                    <ul>
                      <li>
                        ① National Cancer Center (National Cancer Data Center) K-CORE notifies a
                        member through e-mail address or phone number provided by the member to the
                        center.{' '}
                      </li>
                      <li>
                        ② National Cancer Center (National Cancer Data Center) K-CORE may substitute
                        individual notices by posting them on the bulletin board in case of notice
                        to many unspecified members.{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 9 (Member's Personal Information Protection){' '}
                    <ul>
                      <li>
                        ① National Cancer Center (National Cancer Data Center) K-CORE strives to
                        protect users' personal information, including user registration
                        information, in accordance with relevant laws. The protection of users'
                        personal information is governed by the relevant laws and the "Personal
                        Information Handling Policy" set by the National Cancer Center (National
                        Cancer Data Center) K-CORE.{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 10 (National Cancer Center (National Cancer Data Center) K-CORE's
                    Obligations){' '}
                    <ul>
                      <li>
                        ① National Cancer Center (National Cancer Data Center) K-CORE does not
                        engage in acts prohibited by laws and regulations or these Terms and
                        Conditions or contrary to public order and morals and strives to provide
                        continuous and stable services as stipulated in these Terms and Conditions.{' '}
                      </li>
                      <li>
                        ② National Cancer Center (National Cancer Data Center) K-CORE establishes a
                        security system to protect users' personal information so that they can
                        safely use Internet services.{' '}
                      </li>
                      <li>
                        ③ National Cancer Center (National Cancer Data Center) K-CORE does not send
                        commercial e-mails that users do not want.{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 11 (Obligations for User ID and Password)
                    <ul>
                      <li>
                        ① Each user is responsible for managing his/her ID and password, except in
                        cases where the National Cancer Center (National Cancer Data Center) K-CORE
                        takes responsibility for it in accordance with the "Related Acts" and
                        "Personal Information Handling Policy".{' '}
                      </li>
                      <li>② Users must not allow third parties to use their ID and password. </li>
                      <li>
                        ③ If the user recognizes that ID and password have been compromised or used
                        by a third party, immediately notify the National Cancer Center (National
                        Cancer Data Center) K-CORE and the National Cancer Center (National Cancer
                        Data Center) K- CORE's instructions, if any, must be followed.{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 12 (Obligations of Users){' '}
                    <ul>
                      <li>① Users must not engage in any of the following acts. </li>
                      <li>
                        1. Registering false information when applying for membership or changing{' '}
                      </li>
                      <li>
                        2. The act of changing the information posted on the National Cancer Center
                        (National Cancer Data Center) K-CORE{' '}
                      </li>
                      <li>
                        3. National Cancer Center (National Cancer Data Center) Acts that infringe
                        on personal rights or intellectual property rights of K-CORE or other third
                        parties or interfere with business{' '}
                      </li>
                      <li>4. The act of stealing another member's ID</li>
                      <li>
                        5. Any act of disclosing or posting information that goes against public
                        order and morals, such as sending advertisements or e-mails containing
                        obscene, violent messages, images, and voices.{' '}
                      </li>
                      <li>
                        6. Transmission or posting of information (computer programs, etc.) whose
                        transmission or posting is prohibited by relevant laws{' '}
                      </li>
                      <li>
                        7. National Cancer Center (National Cancer Data Center) Posting articles or
                        sending e-mails by impersonating or impersonating an employee or service
                        manager of K-CORE, or stealing someone else's name{' '}
                      </li>
                      <li>
                        8. Posting or sending by e-mail data containing software viruses or other
                        computer codes, files, or programs designed to disrupt or destroy the normal
                        operation of computer software, hardware, and telecommunications equipment{' '}
                      </li>
                      <li>
                        9. Acts of collecting, storing, or disclosing personal information about
                        other users without consent{' '}
                      </li>
                      <li>
                        10. Acts of for-profit activities such as posting advertisements or
                        propaganda targeting unspecified people or sending spam mail{' '}
                      </li>
                      <li>
                        11. Acts that violate the terms of service provided by National Cancer
                        Center (National Cancer Data Center) K-CORE or other service usage
                        regulations{' '}
                      </li>
                      <li>
                        ② If there is a user who has committed an act falling under Paragraph 1, the
                        National Cancer Center (National Cancer Data Center) K-CORE restricts and
                        appropriately suspends the user's membership as stipulated in Article 5,
                        Paragraph 2 of this Agreement.{' '}
                      </li>
                      <li>
                        ③ The user is responsible for compensating for damages suffered by K-CORE or
                        other users of the National Cancer Center (National Cancer Data Center) due
                        to reasons attributable to the user.{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 13 (Attribution of Copyright and Restriction on Use){' '}
                    <ul>
                      <li>
                        ① Copyrights and other intellectual property rights for works created by the
                        National Cancer Center (National Cancer Data Center) K-CORE belong to the
                        National Cancer Center (National Cancer Data Center) K-CORE.{' '}
                      </li>
                      <li>
                        ② Users may copy, transmit, publish, distribute, broadcast, or other methods
                        the information obtained by using the National Cancer Center (National
                        Cancer Data Center) K-CORE without the prior consent of the National Cancer
                        Center (National Cancer Data Center) K-CORE. Users must not use it for
                        profit or let a third party use it.{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 14 (Jurisdiction){' '}
                    <ul>
                      <li>
                        ① National Cancer Center (National Cancer Data Center) Korean law applies to
                        disputes regarding service use between K-CORE and users, and lawsuits
                        arising from this dispute are brought to the courts of the Republic of Korea
                        having jurisdiction under the Civil Procedure Act.{' '}
                      </li>
                    </ul>
                  </li>

                  <li>
                    Article 15 (Enforcement Date){' '}
                    <ul>
                      <li>① These Terms and Conditions shall apply from September 30, 2022.</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-4 pb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-radio"
              checked={firstAgree}
              name="accountType"
              value="personal"
              onChange={() => setFirstAgree(!firstAgree)}
            />
            <span className="ml-2 font-medium">
              I agree to the website membership terms and conditions.
            </span>
          </label>
        </div>
        <div
          className="overflow-auto bg-white border border-gray-400 rounded shadow-sm p-10 resize h-48"
          style={{ width: '40%' }}
        >
          <div className="scrollBox">
            <h4 className="font-medium">
              Consent to collection and use under Articles 15 and 24 of the Personal Information
              Protection Act{' '}
            </h4>
            <p className="font-medium">
              National Cancer Center (National Cancer Data Center) K-CORE processes users' personal
              information as follows:{' '}
            </p>
            <ul className="scrollList">
              <li>
                <font>1. Use of Collected Personal Information </font>
                <ul>
                  <li>Personal information is used for member registration and management.</li>
                  <li>
                    Personal information is used to ensure the smooth operation of services,
                    including sending out notices and handling civil complaints.{' '}
                  </li>
                </ul>
              </li>
              <li>
                <font>2. Personal Information Collected</font>
                <ul>
                  <li>
                    When a user signs up for membership, ID, password, name, contact information,
                    email, affiliation information (government/public institution, university,
                    research institute, medical institution, industry, etc.), and access information
                    are collected as required fields.{' '}
                  </li>
                </ul>
              </li>
              <li>
                <font>3. Period of retention and use of personal information </font>
                <ul>
                  <li>
                    &nbsp;&nbsp; -
                    <ins>
                      <b>
                        The period during which personal information is processed and retained is
                        two years (or until a user withdraws from membership). Personal information
                        can also be destroyed immediately upon the user’s request. Personal
                        information recorded shall be destroyed using technical methods ensuring
                        that the records cannot be reproduced.{' '}
                      </b>
                    </ins>
                  </li>
                  <font>4. User has the right to refuse consent.</font>
                  <ul>
                    <li>
                      however, relevant services including website use and delivery of notices may
                      not run smoothly.
                    </li>
                  </ul>
                </ul>
                <ul>
                  <li>
                    In accordance with the Personal Information Protection Act, I have been informed
                    of each of the above and hereby consent to the processing of the personal
                    information.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-8 pb-6 inline-flex gap-4">
          <label>
            <input
              type="checkbox"
              className="form-radio"
              checked={secondAgree}
              name="accountType"
              value="personal"
              onChange={() => setSecondAgree(!secondAgree)}
            />
            <span className="ml-2 font-medium">I agree to the Privacy Act.</span>
          </label>
          {/* <label>
            <input
              type="checkbox"
              className="form-radio"
              checked={allCheck}
              name="accountType"
              value="personal"
              onChange={() => {
                setAllCheck(!allCheck);
                setFirstAgree(!firstAgree);
                setSecondAgree(!allCheck);
              }}
            />
            <span className="ml-2 font-medium">Complete agreement.</span>
          </label> */}
        </div>
        <div className="inline-flex gap-5 mb-5">
          <button className="hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded bg-grey-700 ">
            disagree
          </button>
          <button
            className="hover:bg-blue-700 text-white font-bold py-6 px-6 float-right rounded bg-NccBlue-700"
            onClick={agreeFunction}
          >
            agree
          </button>
        </div>
      </section>
    </div>
  );
};

export default TermsOfUseEnglish;
