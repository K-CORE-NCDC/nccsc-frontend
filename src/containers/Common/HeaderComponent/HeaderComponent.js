import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import homeIcon from '../../../styles/images/icon-home.svg';
import background from '../../../styles/images/subVisual-img06.jpg';
import { getCookie } from '../../getCookie';


function HeaderComponent({ title, breadCrumbs, type, listItems, routeName }) {
  const { project_id } = useParams();
  const history = useHistory();
  const viz_tabs = ['visualise-multidata', 'visualise-singledata'];
  const upload_tabs = [
    'singledata-upload',
    'newmultidataproject',
    'multidataprojectview',
    'multidatavisualization',
    'blast',
    'vcfmaf',
    'interpro',
    'mafmerger',
    'refverconverter'
  ];

  useEffect(() => {
    viz_tabs?.forEach((item) => {
      if (project_id && window.location.pathname.includes(item)) {
        if (getCookie('is_login') && getCookie('is_login') === 'True') {
        } else {
          history.push('/login');
        }
      }
    });
    upload_tabs?.forEach((ele) => {
      if (window.location.pathname.includes(ele)) {
        if (getCookie('is_login') && getCookie('is_login') === 'True') {
        } else {
          history.push('/login');
        }
      }
    });
  }, [history]);

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
          {items.length > 0 &&
            items.map((item, index) => {
              if (item && item?.to !== '' && item.id !== 'Null') {
                return (
                  <li key={index} className={routeName === item.to ? 'on' : ''}>
                    <Link to={item?.to}>
                      <FormattedMessage id={item?.id} defaultMessage={item?.defaultMessage} />
                    </Link>
                  </li>
                );
              } else if (item?.to === '') {
                return (
                  <li key={index} className={routeName === item.to ? 'on' : ''}>
                    <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
                  </li>
                );
              }
            })}
        </ul>
      );
    }
    return null;
  };
  if(document?.getElementById('imgBoxHead')){
    let d = document?.getElementById('imgBoxHead')
    d.style.transform = 'scale(1)';
  }
  return (
    <div>
      {
        <div id="subVisual" className="subVisual">
          <div id="imgBoxHead" className="imgBox" style={{ backgroundImage: `url(${background})`, }}></div>
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
      }
      {
        <div id="breadCrumbs" className="breadCrumbs">
          <div className="auto">
            <ul>
              <li key="key0">
                <img src={homeIcon} alt="home" />
              </li>
              {renderBreadcrumbs()}
            </ul>
          </div>
        </div>
      }
      {renderLnbContent()}
    </div>
  );
}

export default HeaderComponent;
