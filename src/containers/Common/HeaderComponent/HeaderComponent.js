import React from 'react';
import { FormattedMessage } from "react-intl";
import background from "../../../styles/images/subVisual-img06.jpg"
import homeIcon from "../../../styles/images/icon-home.svg"
function HeaderComponent({ title, breadCrumbs, type }) {

  const renderLnbContent = () => {
    if (type && type === 'single') {
      return (
        <div id="lnb" className="lnb notFix">
          <div className="auto">
            <ul></ul>
          </div>
        </div>
      );
    } else {
      return (
        <div id="lnb" className="lnb">
          <button type="button" className="btn btnPrimary w100">
            <span className="txt">Site introduction</span>
            <div className="arrow">
              <span className="material-icons">keyboard_arrow_down</span>
            </div>
          </button>
          <div className="auto">
            <ul>
              <li className="on"><a href="/main/intro/siteIntro">Site introduction</a></li>
              <li><a href="/main/intro/dataIntro">Description of provided data</a></li>
              <li><a href="/main/intro/centerIntro">Operating organization and history</a></li>
              <li><a href="/main/intro/action/mediaIntro">media publicity</a></li>
            </ul>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {(
        <div id="subVisual" className="subVisual">
          <div className="imgBox" style={{ backgroundImage: `url(${background})` }}></div>
          <div className="txtBox">
            <div className="auto">
              <h2 className="main">{title}</h2>
            </div>
          </div>
        </div>
      )}
      {(
        <div id="breadCrumbs" className="breadCrumbs">
          <div className="auto">
            <ul>
              <li key="key0"><img src={homeIcon} alt="" /></li>
              {breadCrumbs && Object.entries(breadCrumbs).map(([key, value]) => (
                <li key={key}>
                  <FormattedMessage id={key} defaultMessage={value} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {renderLnbContent()}
    </div>
  );
}


export default HeaderComponent;