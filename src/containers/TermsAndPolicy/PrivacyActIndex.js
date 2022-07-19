import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../wrapper";
import KoreanPrivacyAct from "./KoreanPrivacyAct";
import EnglishPrivacyAct from "./EnglishPrivacyAct";
function PrivacyActIndex() {
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const context = useContext(Context);
  useEffect(() => {
    console.log(context["locale"]);
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  });

  return (
    <div>
      {koreanlanguage && (
        <div>
          <KoreanPrivacyAct></KoreanPrivacyAct>
        </div>
      )}
      {Englishlanguage && (
        <div>
          <EnglishPrivacyAct></EnglishPrivacyAct>
        </div>
      )}
    </div>
  );
}

export default PrivacyActIndex;
