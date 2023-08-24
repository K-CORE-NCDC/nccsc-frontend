import React from "react";
import { FormattedMessage } from "react-intl";
import icon1 from '../../assets/images/publicDataInfo-img01.svg'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export const Others = () => {
  const style = {
    mainBox: {
      textAlign: "center",
      justifyContent: "center",
      display: "flex"
    },
    wrapper: {
      width: "350px"
    }
  }
  return (
    <div className="auto">
      <div className="publicDataInfo" style={style.mainBox}>
        <ul style={style.wrapper}>
          <li>
            <img src={icon1} alt="" />
            <dl>
              <dt>
                <FormattedMessage
                  id="Organoid"
                  defaultMessage="Organoid Service" />
              </dt>
              <dd>
                <span><Link to="/organoid/"> <FormattedMessage
                  id="Organoid2"
                  defaultMessage="Organoid Service" /></Link></span>
              </dd>
            </dl>

          </li>
        </ul>
      </div>
    </div>

  )
}