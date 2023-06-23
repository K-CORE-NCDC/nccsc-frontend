import React from 'react';
import { FormattedMessage } from "react-intl";
import background from "../../../styles/images/subVisual-img06.jpg"
import homeIcon from "../../../styles/images/icon-home.svg"
import { Link } from "react-router-dom";
function HeaderComponent({ title, breadCrumbs, type, listItems, routeName }) {

  const renderLnbContent = () => {
    if (type && type === 'single') {
      return (
        <div id="lnb" className="lnb notFix">
          <div className="auto">
            <ul></ul>
          </div>
        </div>
      );
    } else if (listItems && listItems.length > 0) {
      return (
        <div id="lnb" className="lnb">
          <div className="auto">
            <ul>
              {listItems.map((item, index) => (
                <li key={index} className={routeName === item.to ? 'on' : ''}>
                  <Link to={item.to}>
                    <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderBreadcrumbs = () => {
    if (breadCrumbs) {
      const items = breadCrumbs;

      return (
        <ul>
          {items.length>0 && items.map((item, index) => (
            <li key={index} className={routeName === item.to ? 'on' : ''}>
              <Link to={item.to}>
                <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
              </Link>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div>
      {(
        <div id="subVisual" className="subVisual">
          <div className="imgBox" style={{ backgroundImage: `url(${background})` }}></div>
          <div className="txtBox">
            <div className="auto">
              <h2 className="main">
                {title && title.id && title.defaultMessage && (
                  <FormattedMessage id={title.id} defaultMessage={title.defaultMessage} />
                )}
              </h2>
            </div>
          </div>
        </div>
      )}
      {(
        <div id="breadCrumbs" className="breadCrumbs">
          <div className="auto">
            <ul>
              <li key="key0"><img src={homeIcon} alt="" /></li>
              {renderBreadcrumbs()}
            </ul>
          </div>
        </div>
      )}
      {renderLnbContent()}
    </div>
  );
}


export default HeaderComponent;