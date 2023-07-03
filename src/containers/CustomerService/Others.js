import React, { useState } from "react";
import fig from '../../assets/images/figure01.png'
import { FormattedMessage } from "react-intl";

export const Others = () => {
  return (
    <div className="auto">
      <div className="publicDataInfo">
        <ul>
          <li>
            <div className="">
              <img src={fig} alt="" style={{height:'200px'}} />
            </div>
            <span><a href=" ">Organoid Service</a></span>
          </li>
        </ul>
      </div>
    </div>

  )
}