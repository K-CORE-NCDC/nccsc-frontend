import React from "react";

function EnglishPrivacyAct() {
  return (
    <div className="Terms_Conditions_Wrap">
      <h1 style={{ lineHeight: "1.5",fontSize: "31px" }}>
        Consent to collection and use under Articles 15 and 24 of the Personal
        Information Protection Act.
      </h1>
      <h2 className="mt-5" style={{ lineHeight: "1.5",fontSize: "31px" }}>
        National Cancer Center (National Cancer Data Center) K-CORE processes
        users' personal information as follows.
      </h2>
      <ul style={{ lineHeight: "2.3",fontSize: "20px" }}>
        <li>
          1. Purpose of collection and use of personal information Website
          membership registration and management Securing a smooth communication
          channel for delivering notices and handling complaints
        </li>
        <li>
          2. Items of personal information to be collected (Required) ID,
          password, applicant information (name, contact information, email),
          affiliation information (government (public) institution, university
          and research institute, medical institution, industry, etc.), access
          information
        </li>
        <li>
          3. Period of retention and use of personal information Website member
          information is retained and destroyed until membership withdrawal or
          for 2 years, and when deletion is requested (when membership is
          withdrawn), the requester's personal information is immediately
          destroyed in a way that cannot be reproduced.
        </li>
        <li>
          4. You may refuse to consent to this. However, if there is no consent,
          related services such as website service use and notice delivery may
          not proceed smoothly.
        </li>
      </ul>
      <p>
        In accordance with the Personal Information Protection Act, I will be
        notified of each of the above and agree to the processing of personal
        information.
      </p>
    </div>
  );
}

export default EnglishPrivacyAct;
