import React from "react";
import { ChartPieIcon, ChevronDownIcon, FingerPrintIcon, MenuIcon, PhoneIcon, PlusIcon, XCircleIcon } from '@heroicons/react/outline';
import icon1 from '../../assets/images/publicDataInfo-img01.svg'
import icon2 from '../../assets/images/publicDataInfo-img02.svg'
import icon3 from '../../assets/images/publicDataInfo-img03.svg'
import MemoizedFormattedMessage from "react-intl/src/components/message";
import { FormattedMessage } from "react-intl";
const ServiceIntro = () => {
  return (
    <div className="auto">
      <div className="publicDataInfo">
        <ul>
          <li>
            <img src={icon1} alt="" />
            <dl>
              <dt><FormattedMessage
                id="serviceIntro_h1"
                defaultMessage="Single Data Visualization"
              /></dt>
              <dd>
              <FormattedMessage
                id="serviceIntro_txt1"
                defaultMessage="This service visualizes single user input data. It is a one-time analysis service that is not saved."
              /></dd>
            </dl>
          </li>
          <li>
            <img src={icon2} alt="" />
            <dl>
              <dt><FormattedMessage
                id="serviceIntro_h2"
                defaultMessage="Multi Data Visualization"
              /></dt>
              <dd><FormattedMessage
                id="serviceIntro_txt2"
                defaultMessage="This service visualizes multiple(more than 2) user input data. Up to 5 projects can be created."
              /></dd>
            </dl>
          </li>
          <li>
            <img src={icon3} alt="" />
            <br />
            <br />
            <dl>
              <dt ><FormattedMessage
                id="serviceIntro_h3"
                defaultMessage="Other Tools"
              /></dt>
              <br />
              <dd ><FormattedMessage
                id="serviceIntro_txt3"
                defaultMessage="This service visualizes multiple(more than 2) user input data. Up to 5 projects can be created."
              /></dd>
            </dl>
          </li>
        </ul>
      </div>

    </div>

  )

}
export default ServiceIntro;