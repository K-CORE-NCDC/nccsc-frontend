import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../wrapper';
import KoreanTermsAndConditions from './KoreanTermsAndConditions';
import EnglishTermsAndConditions from './EnglishTermsAndConditions';
function KoreanTermsAndConditionsIndex() {
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const context = useContext(Context);

  useEffect(() => {
    if (context['locale'] === 'kr-KO') {
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
          <KoreanTermsAndConditions></KoreanTermsAndConditions>
        </div>
      )}
      {Englishlanguage && (
        <div>
          <EnglishTermsAndConditions></EnglishTermsAndConditions>
        </div>
      )}
    </div>
  );
}

export default KoreanTermsAndConditionsIndex;
