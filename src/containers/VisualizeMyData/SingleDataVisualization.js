import React from "react";
import box_Plot from '../../assets/images/Box.png'
import Circos from '../../assets/images/Circos.png'
import CNN from '../../assets/images/CNN.png'
import DataSummary from '../../assets/images/DataSummary.png'
import HeatMap from '../../assets/images/HeatMap.png'
import lollipop from '../../assets/images/lollipop.png'
import HeaderComponent from "../Common/HeaderComponent/HeaderComponent";
export const SingleDataVisualization = () => {
  return (
    <div>
      <HeaderComponent
        title="회원가입"
        breadCrumbs={{
          key1: 'value1',
          key2: 'value2',
          key3: 'value3'
        }}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div className="section ptn">
          <div className="auto">
            
          </div>
        </div>
      </article>
    </div>
  )

}