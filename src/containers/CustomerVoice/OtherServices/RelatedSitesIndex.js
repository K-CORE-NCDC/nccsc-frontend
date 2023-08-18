import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../wrapper";
import RelatedSitesKorean from "./RelatedSitesKorean";
import RelatedSitesEnglish from "./RelatedSitesEnglish";
function RelatedSitesIndex() {
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const context = useContext(Context);

  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  }, [context]);

  return (
    <div>
      {koreanlanguage && (
        <div>
          <RelatedSitesKorean></RelatedSitesKorean>
        </div>
      )}
      {Englishlanguage && (
        <div>
          <RelatedSitesEnglish></RelatedSitesEnglish>
        </div>
      )}
    </div>
  );
}

export default RelatedSitesIndex;
