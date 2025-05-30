import React from 'react';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';

function EnglishTermsAndConditions() {
  const title = { id: 'TermsofService', defaultMessage: 'Terms of Service' };

  const breadCrumbs = {
    '/termsandconditions/': [
      { id: 'TermsofService', defaultMessage: 'Terms of Service', to: '/termsandconditions/' }
    ]
  };
  return (
    <>
      <HeaderComponent
        title={title}
        breadCrumbs={breadCrumbs['/termsandconditions/']}
        type="single"
      />

      <article id="subContents" className="subContents">
        <div>
          <div className="contentsTitle">
            <div className="auto">
              <h3 className="colorSecondary">
                <span className="colorPrimary">Terms of</span>
                Service
              </h3>
            </div>
          </div>
          <div className="ptn">
            <div className="auto">
              <div className="termsAndConditions">
                <h1 className="" style={{ color: 'rgb(0, 118, 192)' }}>
                  National Cancer Center (National Cancer Data Center) K-CORE Member Terms and
                  Conditions
                </h1>

                <h1 className="">Article 1 Purpose </h1>
                <div className="">
                  <ul className="">
                    <li>
                      <p className="paragraphAdjust">
                        ① These terms and conditions are to stipulate basic matters such as the
                        terms and conditions of use and procedures for the use of internet-related
                        services hereinafter referred to as “services” provided by the K-CORE
                        internet website operated by the National Cancer Center National Cancer Data
                        Center.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ② If a person who wants to become a user clicks the "Agree" button after
                        going through the prescribed procedures set by the National Cancer Center
                        National Cancer Data Center K-CORE, the user is deemed to agree to have
                        these terms and conditions. The rights, duties, and responsibilities of
                        users and the National Cancer Center National Cancer Data Center other than
                        those stipulated in these Terms and Conditions shall be governed by relevant
                        laws and commercial practices of the Republic of Korea.
                      </p>
                    </li>
                  </ul>
                </div>

                <h1 className="">Article 2 Explanation and Amendment of Terms and Conditions</h1>
                <div className="">
                  <ul className="">
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ① The contents of these terms and conditions, address, name of the manager,
                        name of the person in charge of personal information protection, and contact
                        information telephone, fax, e-mail address, etc. will be posted on the first
                        page Privacy Policy of the website so that users can know.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ② National Cancer Center (National Cancer Data Center) K-CORE may amend
                        these Terms and Conditions to the extent that it does not violate relevant
                        laws.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ③ In case of revising the terms and conditions, the date of application and
                        the reason for the revision shall be specified, and the current terms and
                        conditions will be announced on the initial screen of the website from 7
                        days before the effective date to the day before the effective date.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ④ National Cancer Center (National Cancer Data Center) K-CORE will provide
                        services to users on the condition that the user agrees to the contents of
                        this agreement. These Terms and Conditions will take precedence over
                        K-CORE's service provision and users' service use.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ⑤ By agreeing to these terms and conditions, you agree to regularly visit
                        the web to check the changes to the terms and conditions. The National
                        Cancer Center (National Cancer Data Center) K-CORE is not responsible for
                        any damage to users caused by not knowing the information about the changed
                        terms and conditions.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ⑥ If the user does not agree to the changed terms and conditions, the user
                        may request to withdraw from membership (cancellation). If users continue to
                        use the service without expressing their intention to refuse even after 7
                        days from the effective date of the changed terms and conditions, they will
                        be deemed to have agreed to the changes to the terms and conditions.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* 3 */}
                <h1 className="">Article 3 Definition of Terms</h1>
                <div className="">
                  <ul className="">
                    <li>
                      {' '}
                      <h2>
                        <p className="paragraphAdjust">
                          {' '}
                          The definitions of terms used in these terms and conditions are as
                          follows:
                        </p>
                      </h2>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ① User (Member): A person who has registered as a member by providing
                        personal information necessary for membership on the website and can use the
                        information and services of the website.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ② Operator: Refers to a person selected by the National Cancer Center
                        (National Cancer Data Center) K-CORE for the overall management and smooth
                        operation of the service.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ③ Membership registration: Refers to the act of completing the service use
                        contract by entering the relevant information in the application form
                        provided by the website and agreeing to these terms and conditions.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ④ Personal information: It refers to information that can identify an
                        individual through name, resident registration number, video, etc.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ⑤ ID: Refers to the combination of letters and numbers selected by the user
                        and given by the website for identification of the customer and the user to
                        use the service.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        ⑥ Password: A combination of letters and numbers selected by the user to
                        verify the identity of the user and to protect his or her personal
                        information in communication.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ⑦ Linked site: Refers to a website connected to the homepage using a
                        hyperlink (the subject of a hyperlink includes text, still images, and
                        moving images).
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ⑧ Cancellation: Refers to the act of ceasing membership by the user.
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 4 */}
                <h1 className="">Article 4 Membership</h1>
                <div className="">
                  <ul className="">
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ① Membership registration is set up when the user agrees to the contents of
                        these Terms of Use upon application.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ② Consent to these Terms of Use is indicated by clicking the 'agree' button
                        on the website during the membership registration process.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ③ National Cancer Center (National Cancer Data Center) K-CORE may cancel
                        membership registration for any of the following:
                      </p>
                      <ul className="">
                        <li>
                          <p className="paragraphAdjust">
                            {' '}
                            1. If the applicant for membership has previously lost membership in
                            accordance with Article 5, Paragraph 2 of these Terms and Conditions
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            {' '}
                            2. In case of false, omission, or error in the registration details
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            {' '}
                            3. If it is judged that registering as a member is significantly impeded
                            by the center's technology or business performance
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            {' '}
                            4. When an application is made to disturb the social well-being or
                            public morals
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            {' '}
                            5. When using the website and performing acts prohibited by laws and
                            these terms and conditions
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            {' '}
                            6. If the password entered is not more than 9 and less than 20
                            characters (contain at least three character categories among the
                            following: uppercase, lowercase, numeric, or special character)
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ④ National Cancer Center (National Cancer Data Center) K-CORE may suspend
                        the establishment of the contract of use until the cause is resolved in each
                        of the following cases.
                      </p>
                      <ul className="">
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            {' '}
                            1. In case of insufficient service-related capacity{' '}
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust"> 2. If there is a technical obstacle </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ⑤ When there is a change in the registration information, the user must
                        immediately notify the National Cancer Center (National Cancer Data Center)
                        K-CORE of the change in other ways such as modifying member information.
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 5  */}
                <h1 className="">
                  Article 5 Withdrawal of membership and loss of qualifications, etc.
                </h1>
                <div className="">
                  <ul className="">
                    <li>
                      <p className="paragraphAdjust">
                        ① A user may withdraw from membership (cancellation) at any time after
                        signing up for membership if a user does not intend to receive the Internet
                        service provided by K-CORE of the National Cancer Center (National Cancer
                        Data Center).
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        ② If the user falls under any of the following reasons, the National Cancer
                        Center (National Cancer Data Center) K-CORE may lose membership.
                      </p>
                      <ul className="">
                        <li>
                          <p className="paragraphAdjust">
                            1. In case of registering false information when applying for
                            registration
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            2. In case of threatening order, such as interfering with other users'
                            use of the service or stealing the information
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            3. In the case of selling unverified false information and other
                            unauthorized items within the National Cancer Center (National Cancer
                            Data Center) K-CORE
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            4. National Cancer Center (National Cancer Data Center) In case of use
                            as a place of propaganda for treatment or treatment that is not
                            permitted within K-CORE
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            5. In case the National Cancer Center (National Cancer Data Center)
                            interferes with the operation of the website, such as changing the
                            information provided in K-CORE
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            6. National Cancer Center (National Cancer Data Center) In case of using
                            K-CORE to conduct an act prohibited by laws and these Terms and
                            Conditions or contrary to public order and morals
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            7. In case it is judged inappropriate to continue the qualification of
                            other members
                          </p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                {/* 6 */}
                <h1 className="">Article 6 Contents and Changes of Services</h1>
                <div className="">
                  <ul className="">
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ① National Cancer Center (National Cancer Data Center) K-CORE provides the
                        following services.
                      </p>
                      <ul className="">
                        <li>
                          <p className="paragraphAdjust">
                            {' '}
                            1. National Cancer Center (National Cancer Data Center) K-CORE-related
                            business introduction
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            {' '}
                            2. Data visualization service provided by the National Cancer Center
                            (National Cancer Data Center)
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust">
                            {' '}
                            3. National Cancer Center (National Cancer Data Center) data application
                            guide
                          </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust"> 4. User data visualization service </p>
                        </li>
                        <li>
                          <p className="paragraphAdjust"> 5. OTHER PROVIDED SERVICES </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ② National Cancer Center (National Cancer Data Center) K-CORE may change the
                        contents of the service provided in case of unavoidable circumstances. In
                        this case, the contents of the changed service and the date of provision
                        will be specified and announced 7 day before the effective date.
                      </p>
                    </li>
                    <li>
                      <p className="paragraphAdjust">
                        {' '}
                        ③ National Cancer Center (National Cancer Data Center) K-CORE shall not
                        compensate users for damages caused by changes in service contents unless
                        due to intentional or gross negligence of K-CORE of the National Cancer
                        Center (National Cancer Data Center).
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 7*/}
                <h1 className="">Article 7 Suspension of Service</h1>
                <div className="">
                  <ul className="">
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ① National Cancer Center (National Cancer Data Center) K-CORE may
                        temporarily suspend the provision of services in the event of maintenance,
                        replacement, or breakdown of information and communication facilities such
                        as computers and systems, interruption of communication, or other force
                        majeure reasons.{' '}
                      </p>
                    </li>
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ② National Cancer Center (National Cancer Data Center) K-CORE will provide
                        individual notices to users by posting in advance on the K-CORE website of
                        the National Cancer Center (National Cancer Data Center) in the case of a
                        temporary cessation of service provision due to the reasons set out in
                        Paragraph 1 above unless advance notice is not possible due to service
                        interruption or reasons beyond the control of the National Cancer Center
                        (National Cancer Data Center). Unless it is impossible to notify in advance
                        due to the interruption of the service or reasons beyond the control of the
                        National Cancer Center K-CORE (intentional, faultless disk failure, system
                        down, etc.)
                      </p>
                    </li>
                    <li className="">
                      {' '}
                      <p className="paragraphAdjust">
                        ③ National Cancer Center (National Cancer Data Center) K-CORE will not
                        compensate for damages suffered by users or third parties due to changes in
                        service contents without intention or negligence unless due to intentional
                        or gross negligence of the Center.
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 8*/}
                <h1 className="">Article 8 Notification to Members</h1>
                <div className="">
                  <ul className="">
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ① National Cancer Center (National Cancer Data Center) K-CORE notifies a
                        member through e-mail address or phone number provided by the member to the
                        center.
                      </p>
                    </li>
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ② National Cancer Center (National Cancer Data Center) K-CORE may substitute
                        individual notices by posting them on the bulletin board in case of notice
                        to many unspecified members.
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 9*/}
                <h1 className="">Article 9 Member's Personal Information Protection</h1>
                <div className="">
                  <ul className="">
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ① National Cancer Center (National Cancer Data Center) K-CORE strives to
                        protect users' personal information, including user registration
                        information, in accordance with relevant laws. The protection of users'
                        personal information is governed by the relevant laws and the "Personal
                        Information Handling Policy" set by the National Cancer Center (National
                        Cancer Data Center) K-CORE.
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 10*/}
                <h1 className="">
                  Article 10 National Cancer Center (National Cancer Data Center) K-CORE's
                  Obligations
                </h1>
                <div className="">
                  <ul className="">
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ① National Cancer Center (National Cancer Data Center) K-CORE does not
                        engage in acts prohibited by laws and regulations or these Terms and
                        Conditions or contrary to public order and morals and strives to provide
                        continuous and stable services as stipulated in these Terms and Conditions.
                      </p>
                    </li>
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ② National Cancer Center (National Cancer Data Center) K-CORE establishes a
                        security system to protect users' personal information so that they can
                        safely use Internet services.
                      </p>
                    </li>
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ③ National Cancer Center (National Cancer Data Center) K-CORE does not send
                        commercial e-mails that users do not want.
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 11*/}
                <h1 className="">Article 11 Obligations for User ID and Password</h1>
                <div className="">
                  <ul className="">
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ① Each user is responsible for managing his/her ID and password, except in
                        cases where the National Cancer Center (National Cancer Data Center) K-CORE
                        takes responsibility for it in accordance with the "Related Acts" and
                        "Personal Information Handling Policy".
                      </p>
                    </li>
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ② Users must not allow third parties to use their ID and password.
                      </p>
                    </li>
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ③ If the user recognizes that ID and password have been compromised or used
                        by a third party, immediately notify the National Cancer Center (National
                        Cancer Data Center) K-CORE and the National Cancer Center (National Cancer
                        Data Center) K- CORE's instructions, if any, must be followed.
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 12*/}
                <h1 className="">Article 12 Obligations of Users</h1>
                <div className="">
                  <ul className="">
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ① Users must not engage in any of the following acts.
                      </p>
                      <ul className="">
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            1. Registering false information when applying for membership or
                            changing{' '}
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            2. The act of changing the information posted on the National Cancer
                            Center (National Cancer Data Center) K-CORE
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            3. National Cancer Center (National Cancer Data Center) Acts that
                            infringe on personal rights or intellectual property rights of K-CORE or
                            other third parties or interfere with business
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            {' '}
                            4. The act of stealing another member's ID
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            5. Any act of disclosing or posting information that goes against public
                            order and morals, such as sending advertisements or e-mails containing
                            obscene, violent messages, images, and voices.
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            6. Transmission or posting of information (computer programs, etc.)
                            whose transmission or posting is prohibited by relevant laws
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            7. National Cancer Center (National Cancer Data Center) Posting articles
                            or sending e-mails by impersonating or impersonating an employee or
                            service manager of K-CORE, or stealing someone else's name
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            8. Posting or sending by e-mail data containing software viruses or
                            other computer codes, files, or programs designed to disrupt or destroy
                            the normal operation of computer software, hardware, and
                            telecommunications equipment
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            9. Acts of collecting, storing, or disclosing personal information about
                            other users without consent
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            10. Acts of for-profit activities such as posting advertisements or
                            propaganda targeting unspecified people or sending spam mail
                          </p>
                        </li>
                        <li>
                          {' '}
                          <p className="paragraphAdjust">
                            11. Acts that violate the terms of service provided by National Cancer
                            Center (National Cancer Data Center) K-CORE or other service usage
                            regulations{' '}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ② If there is a user who has committed an act falling under Paragraph 1, the
                        National Cancer Center (National Cancer Data Center) K-CORE restricts and
                        appropriately suspends the user's membership as stipulated in Article 5,
                        Paragraph 2 of this Agreement.
                      </p>
                    </li>
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ③ The user is responsible for compensating for damages suffered by K-CORE or
                        other users of the National Cancer Center (National Cancer Data Center) due
                        to reasons attributable to the user.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* 13*/}
                <h1 className="">Article 13 (Attribution of Copyright and Restriction on Use)</h1>
                <div className="">
                  <ul className="m-8">
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ① Copyrights and other intellectual property rights for works created by the
                        National Cancer Center (National Cancer Data Center) K-CORE belong to the
                        National Cancer Center (National Cancer Data Center) K-CORE.
                      </p>
                    </li>
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ② Users may copy, transmit, publish, distribute, broadcast, or other methods
                        the information obtained by using the National Cancer Center (National
                        Cancer Data Center) K-CORE without the prior consent of the National Cancer
                        Center (National Cancer Data Center) K-CORE. Users must not use it for
                        profit or let a third party use it.
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 14*/}
                <h1 className="">Article 14 Jurisdiction</h1>
                <div className="">
                  <ul className="">
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ① National Cancer Center (National Cancer Data Center) Korean law applies to
                        disputes regarding service use between K-CORE and users, and lawsuits
                        arising from this dispute are brought to the courts of the Republic of Korea
                        having jurisdiction under the Civil Procedure Act.
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 15*/}
                <h1 className="">Article 15 Enforcement Date</h1>
                <div className="">
                  <ul className="">
                    <li>
                      {' '}
                      <p className="paragraphAdjust">
                        ① These Terms and Conditions shall apply from September 30, 2022.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default EnglishTermsAndConditions;
