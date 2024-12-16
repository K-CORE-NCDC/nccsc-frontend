import React from 'react';
import { FormattedMessage } from 'react-intl';
import icon1 from '../../assets/images/publicDataInfo-img01.svg';
import icon2 from '../../assets/images/publicDataInfo-img02.svg';
import icon3 from '../../assets/images/publicDataInfo-img03.svg';

const ServiceIntro = () => {
  return (
    <div className="auto tabContents" style={{ height: '80vh' }}>
      <div className="publicDataInfo" style={{ padding: "9px 54px" }}>
        <div className="mainDataStatusWrap Relative">
          <div className="mainDataStatus">
            <dl className="serviceIntroBox">
              <dt>
                <img src={icon1} alt="singledata" />
                <strong>
                  <FormattedMessage
                    id="serviceIntro_h1"
                    defaultMessage="Single Data Visualization"
                  />
                </strong>
              </dt>
              <dd className="subtitle01">
                <FormattedMessage
                  id="serviceIntro_txt1"
                  defaultMessage="This service visualizes single user input data. It is a one-time analysis service that is not saved."
                />
              </dd>
            </dl>
            <dl className="serviceIntroBox">
              <dt>
                <img src={icon2} alt="multidata" />
                <strong>
                  <FormattedMessage
                    id="serviceIntro_h2"
                    defaultMessage="Multi Data Visualization"
                  />
                </strong>
              </dt>
              <dd className="subtitle01">
                <FormattedMessage
                  id="serviceIntro_txt2"
                  defaultMessage="This service visualizes multiple(more than 2) user input data. Up to 5 projects can be created."
                />
              </dd>
            </dl>
            <dl className="serviceIntroBox">
              <dt>
                <img src={icon3} alt="othertools" />
                <strong>
                  <FormattedMessage id="serviceIntro_h3" defaultMessage="Other Tools" />
                </strong>
              </dt>
              <dd className="subtitle01">
                <FormattedMessage
                  id="serviceIntro_txt3"
                  defaultMessage="This service provides various functions such as pre-processing of genomic data and annotation of biomedical information."
                />
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceIntro;
