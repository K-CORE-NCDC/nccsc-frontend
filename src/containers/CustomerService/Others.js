import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import icon1 from '../../assets/images/publicDataInfo-img01.svg';
export const Others = () => {
  const style = {
    mainBox: {
      textAlign: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
    wrapper: {
      width: '350px'
    }
  };
  return (
    <div className="auto">
      <div className="publicDataInfo" style={style.mainBox}>
        <ul style={style.wrapper}>
          <li>
            <Link to="/organoid/">
            <img src={icon1} alt="organoid" />
            <dl>
              <dt>
                <FormattedMessage id="Organoid" defaultMessage="Organoid Service" />
              </dt>
              <dd>
                <span>
                    <FormattedMessage id="Organoid2" defaultMessage="Organoid Service" />
                </span>
              </dd>
            </dl>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
