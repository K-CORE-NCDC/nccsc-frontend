import React from "react";

function EnglishPrivacyAct() {
  return (
    <div className="Terms_Conditions_Wrap">
      <h1 style={{ lineHeight: "1.5",fontSize: "31px" }}>
      Consent to collection and use under Articles 15 and 24 of the Personal Information Protection Act
      </h1>
      <h2 className="mt-5" style={{ lineHeight: "1.5",fontSize: "31px" }}>
      National Cancer Center (National Cancer Data Center) K-CORE processes users' personal information as follows:
      </h2>
      <ul  className="m-6" style={{ lineHeight: "2.3",fontSize: "20px" }}>
        <li>
        1. Use of Collected Personal Information 
        </li>
        <ul>
        <li>
        Personal information is used for member registration and management.
        </li>
        <li>
        Personal information is used to ensure the smooth operation of services, including sending out notices and handling civil complaints.
        </li>
        </ul>
        <li>
        2. Personal Information Collected 

        <ul>
          <li>When a user signs up for membership, ID, password, name, contact information, email, affiliation information (government/public institution, university, research institute, medical institution, industry, etc.), and access information are collected as required fields.</li>
        </ul>
        </li>
        <li>
        3. Period of retention and use of personal information

        <ul>
          <li>The period during which personal information is processed and retained is two years (or until a user withdraws from membership). Personal information can also be destroyed immediately upon the user’s request. Personal information recorded shall be destroyed using technical methods ensuring that the records cannot be reproduced.</li>
        </ul>
        </li>
        <li>
        4. User has the right to refuse consent; however, relevant services including website use and delivery of notices may not run smoothly.
        </li>
      </ul>
      <p>
      In accordance with the Personal Information Protection Act, I have been informed of each of the above and hereby consent to the processing of the personal information. 
      </p>
    </div>
  );
}

export default EnglishPrivacyAct;
